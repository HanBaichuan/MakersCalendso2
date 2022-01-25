import { GetServerSidePropsContext } from "next";
import { getCsrfToken, signIn } from "next-auth/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import { ErrorCode, getSession } from "@lib/auth";
import { useLocale } from "@lib/hooks/useLocale";
import { inferSSRProps } from "@lib/types/inferSSRProps";

import AddToHomescreen from "@components/AddToHomescreen";
import Loader from "@components/Loader";
import { HeadSeo } from "@components/seo/head-seo";

import { ssrInit } from "@server/lib/ssr";

export default function Login({ csrfToken }: inferSSRProps<typeof getServerSideProps>) {
  const { t } = useLocale();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [secondFactorRequired, setSecondFactorRequired] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const errorMessages: { [key: string]: string } = {
    [ErrorCode.SecondFactorRequired]: t("2fa_enabled_instructions"),
    [ErrorCode.IncorrectPassword]: `${t("incorrect_password")} ${t("please_try_again")}`,
    [ErrorCode.UserNotFound]: t("no_account_exists"),
    [ErrorCode.IncorrectTwoFactorCode]: `${t("incorrect_2fa_code")} ${t("please_try_again")}`,
    [ErrorCode.InternalServerError]: `${t("something_went_wrong")} ${t("please_try_again_and_contact_us")}`,
  };

  const callbackUrl = typeof router.query?.callbackUrl === "string" ? router.query.callbackUrl : "/";

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await signIn("credentials", {
        redirect: false,
        email,
        password,
        totpCode: code,
        callbackUrl,
      });
      if (!response) {
        throw new Error("Received empty response from next auth");
      }

      if (!response.error) {
        // we're logged in! let's do a hard refresh to the desired url
        window.location.replace(callbackUrl);
        return;
      }

      if (response.error === ErrorCode.SecondFactorRequired) {
        setSecondFactorRequired(true);
        setErrorMessage(errorMessages[ErrorCode.SecondFactorRequired]);
      } else {
        setErrorMessage(errorMessages[response.error] || t("something_went_wrong"));
      }
      setIsSubmitting(false);
    } catch (e) {
      setErrorMessage(t("something_went_wrong"));
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <HeadSeo title={t("login")} description={t("login")} />

      {isSubmitting && (
        <div className="z-50 absolute w-full h-screen bg-gray-50 flex items-center">
          <Loader />
        </div>
      )}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/*         <script src="/makers-logo/logo_factory.js"></script>
        <script src="/makers-logo/anime.min.js"></script> */}
        {/*         <img className="h-6 mx-auto" src="/makerslogo.gif" alt="Cal.com Logo" style={{ width: 100 + "px", height: 100 + "px" }} />*/}

        <div className="h-6 mx-auto" style={{ width: 90 + "px", height: 90 + "px" }}>
          <embed type="text/html" src="/makers-logo/index.html" width="100" height="100"></embed>
        </div>

        <h2 className="font-cal mt-6 text-center text-3xl font-bold text-neutral-900">
          {t("sign_in_account")}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 mx-2 rounded-sm sm:px-10 border border-neutral-200">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <input name="csrfToken" type="hidden" defaultValue={csrfToken || undefined} hidden />
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-700">
                {t("email_address")}
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  required
                  value={email}
                  onInput={(e) => setEmail(e.currentTarget.value)}
                  className="appearance-none block w-full px-3 py-2 border border-neutral-300 rounded-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-neutral-900 focus:border-neutral-900 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <div className="flex">
                <div className="w-1/2">
                  <label htmlFor="password" className="block text-sm font-medium text-neutral-700">
                    {t("password")}
                  </label>
                </div>
                <div className="w-1/2 text-right">
                  <Link href="/auth/forgot-password">
                    <a tabIndex={-1} className="font-medium text-primary-600 text-sm">
                      {t("forgot")}
                    </a>
                  </Link>
                </div>
              </div>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onInput={(e) => setPassword(e.currentTarget.value)}
                  className="appearance-none block w-full px-3 py-2 border border-neutral-300 rounded-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-neutral-900 focus:border-neutral-900 sm:text-sm"
                />
              </div>
            </div>

            {secondFactorRequired && (
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-700">
                  {t("2fa_code")}
                </label>
                <div className="mt-1">
                  <input
                    id="totpCode"
                    name="totpCode"
                    type="text"
                    maxLength={6}
                    minLength={6}
                    inputMode="numeric"
                    value={code}
                    onInput={(e) => setCode(e.currentTarget.value)}
                    className="appearance-none block w-full px-3 py-2 border border-neutral-300 rounded-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-neutral-900 focus:border-neutral-900 sm:text-sm"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-sm shadow-sm text-sm font-medium text-white bg-neutral-900 hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
                {t("sign_in")}
              </button>
            </div>

            {errorMessage && <p className="mt-1 text-sm text-red-700">{errorMessage}</p>}
          </form>
        </div>
        <div className="mt-4 text-neutral-600 text-center text-sm">
          {t("dont_have_an_account")} {/* replace this with your account creation flow */}
          <a href="https://cal.com/signup" className="font-medium text-neutral-900">
            {t("create_an_account")}
          </a>
        </div>
      </div>
      <AddToHomescreen />
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req } = context;
  const session = await getSession({ req });
  const ssr = await ssrInit(context);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      csrfToken: await getCsrfToken(context),
      trpcState: ssr.dehydrate(),
    },
  };
}
