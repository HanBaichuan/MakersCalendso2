import { CheckIcon } from "@heroicons/react/outline";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";

import { useLocale } from "@lib/hooks/useLocale";

import { HeadSeo } from "@components/seo/head-seo";

import { ssrInit } from "@server/lib/ssr";

export default function Logout() {
  const { t } = useLocale();

  return (
    <div
      className="fixed z-50 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true">
      <HeadSeo title={t("logged_out")} description={t("logged_out")} />
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
          <div>
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <CheckIcon className="h-6 w-6 text-green-600" />
            </div>
            <div className="mt-3 text-center sm:mt-5">
              <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                {t("youve_been_logged_out")}
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">{t("hope_to_see_you_soon")}</p>
              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-6">
            <Link href="/auth/login">
              <a className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-brand text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black sm:text-sm">
                {t("go_back_login")}
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const ssr = await ssrInit(context);

  return {
    props: {
      trpcState: ssr.dehydrate(),
    },
  };
}
