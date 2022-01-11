console.log("I WAS IMPORTED!!!")
//some utilities
function clamp(number, min, max) {
    return Math.max(min, Math.min(number, max));
}
function setAttributes(el, attrs) {
    for (var key in attrs) {
        el.setAttributeNS(null, key, attrs[key]);
    }
}

//customElements.define('makers-logo', Logo) makes logo a custom HTML tag
class Logo extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        //get attributes for the makers-logo html tag
        var scale = this.attributes.scale
        var still = this.attributes.still
        if (scale) {
            scale = scale.value
        } else {
            scale = 100
        }
        if (still) {
            still = still.value
        }

        //create SVG, 
        //create dots with initial positions and radius
        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute('width', scale)
        svg.setAttribute('height', scale)
        svg.setAttribute('viewBox', "0 0 170 170")
        //svg.style.border = "1px solid white"
        const dot_init_attr = [
            { cx: 95, cy: 10, r: 1, init_r: 1 },
            { cx: 105, cy: 20, r: 2, init_r: 2 },
            { cx: 85, cy: 20, r: 2, init_r: 2 },
            { cx: 115, cy: 30, r: 3, init_r: 3 },
            { cx: 95, cy: 30, r: 3, init_r: 3 },
            { cx: 75, cy: 30, r: 3, init_r: 3 },
            { cx: 125, cy: 40, r: 4, init_r: 4 },
            { cx: 105, cy: 40, r: 4, init_r: 4 },
            { cx: 85, cy: 40, r: 4, init_r: 4 },
            { cx: 65, cy: 40, r: 4, init_r: 4 },
            { cx: 135, cy: 50, r: 5, init_r: 5 },
            { cx: 115, cy: 50, r: 5, init_r: 5 },
            { cx: 95, cy: 50, r: 4, init_r: 4 },
            { cx: 75, cy: 50, r: 5, init_r: 5 },
            { cx: 55, cy: 50, r: 5, init_r: 5 },
            { cx: 145, cy: 60, r: 4, init_r: 4 },
            { cx: 125, cy: 60, r: 6, init_r: 6 },
            { cx: 105, cy: 60, r: 5, init_r: 5 },
            { cx: 85, cy: 60, r: 5, init_r: 5 },
            { cx: 65, cy: 60, r: 6, init_r: 6 },
            { cx: 45, cy: 60, r: 4, init_r: 4 },
            { cx: 155, cy: 70, r: 3, init_r: 3 },
            { cx: 135, cy: 70, r: 5, init_r: 5 },
            { cx: 115, cy: 70, r: 6, init_r: 6 },
            { cx: 95, cy: 70, r: 5, init_r: 5 },
            { cx: 75, cy: 70, r: 6, init_r: 6 },
            { cx: 55, cy: 70, r: 5, init_r: 5 },
            { cx: 35, cy: 70, r: 3, init_r: 3 },
            { cx: 165, cy: 80, r: 2, init_r: 2 },
            { cx: 145, cy: 80, r: 4, init_r: 4 },
            { cx: 125, cy: 80, r: 6, init_r: 6 },
            { cx: 105, cy: 80, r: 6, init_r: 6 },
            { cx: 85, cy: 80, r: 6, init_r: 6 },
            { cx: 65, cy: 80, r: 6, init_r: 6 },
            { cx: 45, cy: 80, r: 4, init_r: 4 },
            { cx: 25, cy: 80, r: 2, init_r: 2 },
            { cx: 175, cy: 90, r: 1, init_r: 1 },
            { cx: 155, cy: 90, r: 3, init_r: 3 },
            { cx: 135, cy: 90, r: 5, init_r: 5 },
            { cx: 115, cy: 90, r: 5, init_r: 5 },
            { cx: 95, cy: 90, r: 6, init_r: 6 },
            { cx: 75, cy: 90, r: 5, init_r: 5 },
            { cx: 55, cy: 90, r: 5, init_r: 5 },
            { cx: 35, cy: 90, r: 3, init_r: 3 },
            { cx: 15, cy: 90, r: 1, init_r: 1 },
            { cx: 25, cy: 100, r: 2, init_r: 2 },
            { cx: 45, cy: 100, r: 4, init_r: 4 },
            { cx: 65, cy: 100, r: 6, init_r: 6 },
            { cx: 85, cy: 100, r: 5, init_r: 5 },
            { cx: 105, cy: 100, r: 5, init_r: 5 },
            { cx: 125, cy: 100, r: 6, init_r: 6 },
            { cx: 145, cy: 100, r: 4, init_r: 4 },
            { cx: 165, cy: 100, r: 2, init_r: 2 },
            { cx: 35, cy: 110, r: 3, init_r: 3 },
            { cx: 55, cy: 110, r: 5, init_r: 5 },
            { cx: 75, cy: 110, r: 5, init_r: 5 },
            { cx: 95, cy: 110, r: 5, init_r: 5 },
            { cx: 115, cy: 110, r: 5, init_r: 5 },
            { cx: 135, cy: 110, r: 5, init_r: 5 },
            { cx: 155, cy: 110, r: 3, init_r: 3 },
            { cx: 45, cy: 120, r: 4, init_r: 4 },
            { cx: 65, cy: 120, r: 6, init_r: 6 },
            { cx: 85, cy: 120, r: 4, init_r: 4 },
            { cx: 105, cy: 120, r: 4, init_r: 4 },
            { cx: 125, cy: 120, r: 6, init_r: 6 },
            { cx: 145, cy: 120, r: 4, init_r: 4 },
            { cx: 55, cy: 130, r: 5, init_r: 5 },
            { cx: 75, cy: 130, r: 5, init_r: 5 },
            { cx: 95, cy: 130, r: 4, init_r: 4 },
            { cx: 115, cy: 130, r: 5, init_r: 5 },
            { cx: 135, cy: 130, r: 5, init_r: 5 },
            { cx: 65, cy: 140, r: 4, init_r: 4 },
            { cx: 85, cy: 140, r: 4, init_r: 4 },
            { cx: 105, cy: 140, r: 4, init_r: 4 },
            { cx: 125, cy: 140, r: 4, init_r: 4 },
            { cx: 75, cy: 150, r: 3, init_r: 3 },
            { cx: 95, cy: 150, r: 3, init_r: 3 },
            { cx: 115, cy: 150, r: 3, init_r: 3 },
            { cx: 85, cy: 160, r: 2, init_r: 2 },
            { cx: 105, cy: 160, r: 2, init_r: 2 },
            { cx: 95, cy: 170, r: 1, init_r: 1 }
        ]
        for (i in dot_init_attr) {
            var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle.setAttribute("class", "dot")
            dot_init_attr[i]['cx'] = dot_init_attr[i]['cx'] - 10
            dot_init_attr[i]['cy'] = dot_init_attr[i]['cy'] - 5
            setAttributes(circle, dot_init_attr[i])
            circle.style.fill = "white"
            svg.append(circle)
        }
        var trigger = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        trigger.style.fill = "rgba(0, 0, 0, 0)"
        setAttributes(trigger, { width: 120, height: 120, transform: "translate(85 0), rotate(45)" })
        var wave = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        wave.style.fill = "rgba(0, 0, 0, 0)"
        setAttributes(wave, { cx: 200, cy: 200, r: 0, "pointer-events": "none" })
        svg.append(trigger)
        svg.append(wave)
        var dots = svg.querySelectorAll('.dot')

        //Initialize dots colour and scale
        for (var i = 0; i < dots.length; i++) {
            dots[i].setAttribute("r", 1)
            dots[i].style.fill = "rgba(0,0,0,1)"
        }

        //Attributes lerped by anime.js
        var wave_attr = {
            size: 0,
            color: "rgba(0,0,0,1)"
        }

        //Attributes lerped by anime.js
        var reveal_progress = {
            size: 0,
            color: "rgba(0,0,0,0)"
        }

        //append an anime object in a list is my only way to reference animation outside of the listener, pause it, and remove the animation
        var anim_list = []

        //mouse speed to determin the force of pointer enter
        var mouse_speed = { "speedX": 0, "speedY": 0, "speed": 0 }

        //Track mouse speed
        var timestamp = null;
        var lastMouseX = null;
        var lastMouseY = null;
        document.body.addEventListener("mousemove", function (e) {
            if (timestamp === null) {
                timestamp = Date.now();
                lastMouseX = e.screenX;
                lastMouseY = e.screenY;
                return;
            }
            var now = Date.now();
            var dt = now - timestamp;
            var dx = e.screenX - lastMouseX;
            var dy = e.screenY - lastMouseY;
            var speedX = Math.round(dx / dt * 100);
            var speedY = Math.round(dy / dt * 100);
            mouse_speed['speedX'] = Math.abs(speedX)
            mouse_speed['speedY'] = Math.abs(speedY)
            mouse_speed['speed'] = (speedX ** 2 + speedY ** 2) ** (1 / 2)
            timestamp = now;
            lastMouseX = e.screenX;
            lastMouseY = e.screenY;
        });

        //when dots are loaded, reveal
        window.addEventListener("DOMContentLoaded", (e) => {
            anime({
                targets: reveal_progress,
                size: 6,
                transparency: 1,
                duration: 1000,
                easing: 'easeInOutSine',
                update: function () {
                    for (var i = 0; i < dots.length; i++) {
                        var current_size = Math.min(dots[i].getAttribute('init_r'), reveal_progress.size);
                        dots[i].setAttribute('r', current_size)
                        dots[i].style.fill = "rgba(0,0,0," + reveal_progress.transparency + ")"
                    }
                }
            })
        })

        //when pointer enter, 
        //read force and enter point,
        //wave teleports to and scales at enter point,
        //dots breath once upon touching the wave
        if (still != "yes") {
            trigger.addEventListener("pointerenter", (e) => {
                {
                    var force = mouse_speed['speed']
                    for (var i = 0; i < dots.length; i++) {
                        dots[i].setAttribute("mode", "shrink")
                    }
                    wave_attr = {
                        size: 0,
                        color: "rgba(0,0,0,0.5)"
                    }
                    var pt = svg.createSVGPoint();
                    pt.x = e.clientX;
                    pt.y = e.clientY;
                    var ep = pt.matrixTransform(svg.getScreenCTM().inverse());
                    var enter_point = [ep.x, ep.y]
                    try {
                        anim_list[anim_list.length - 1].pause()
                        anim_list = []
                    } catch (err) {
                    }
                    var anim = anime({
                        targets: wave_attr,
                        size: 170,
                        easing: "easeOutQuint",
                        duration: 3000 * clamp(force / 130, 1, 1.5),
                        update: function () {
                            wave.setAttribute("r", wave_attr.size)
                            for (var i = 0; i < dots.length; i++) {
                                var dx = enter_point[0] - dots[i].getAttribute("cx")
                                var dy = enter_point[1] - dots[i].getAttribute("cy")
                                var d = (dx ** 2 + dy ** 2) ** (1 / 2)
                                if (wave_attr.size > d - 0.5) {
                                    var r_n = dots[i].getAttribute("init_r")
                                    if (dots[i].getAttribute("mode") == null || dots[i].getAttribute("mode") == "shrink") {
                                        anime({
                                            targets: dots[i],
                                            keyframes: [
                                                { r: r_n * r_n / 3.4 * clamp(force / 100, 0.8, 1.1), fill: "rgba(0,0,0,1)" },
                                                { r: r_n, fill: "rgba(0,0,0,1)" },
                                            ],
                                            easing: "linear",
                                            delay: 0,
                                            duration: 500
                                        })
                                    }
                                    dots[i].setAttribute("mode", "grow")
                                }
                            }
                        }
                    })
                    anim_list.push(anim)
                    wave.setAttribute("cx", enter_point[0])
                    wave.setAttribute("cy", enter_point[1])
                }
            })

            trigger.addEventListener("pointerdown", (e) => {
                {
                    console.log("trigger")
                    for (var i = 0; i < dots.length; i++) {
                        dots[i].setAttribute("mode", "shrink")
                    }
                    wave_attr = {
                        size: 0,
                        color: "rgba(0,0,0,0.5)"
                    }
                    var pt = svg.createSVGPoint();
                    pt.x = e.clientX;
                    pt.y = e.clientY;
                    var ep = pt.matrixTransform(svg.getScreenCTM().inverse());
                    var enter_point = [ep.x, ep.y]
                    try {
                        anim_list[anim_list.length - 1].pause()
                        anim_list = []
                    } catch (err) {
                        console.log("first")
                    }
                    var anim = anime({
                        targets: wave_attr,
                        size: 170,
                        easing: "linear",
                        duration: 1000,
                        update: function () {
                            wave.setAttribute("r", wave_attr.size)
                            for (var i = 0; i < dots.length; i++) {
                                var dx = enter_point[0] - dots[i].getAttribute("cx")
                                var dy = enter_point[1] - dots[i].getAttribute("cy")
                                var d = (dx ** 2 + dy ** 2) ** (1 / 2)
                                if (dots[i].id == "blue") {
                                    //console.log("ENTER: " + [Math.floor(enter_point[0]), Math.floor(enter_point[1])]  + " THAT DOT: " + [Math.floor(dots[i].getAttribute("cx")), Math.floor(dots[i].getAttribute("cy"))] + " size: " + wave_attr.size)
                                }
                                if (wave_attr.size > d - 0.5) {
                                    var r_n = dots[i].getAttribute("init_r")
                                    if (dots[i].getAttribute("mode") == null || dots[i].getAttribute("mode") == "shrink") {
                                        anime({
                                            targets: dots[i],
                                            keyframes: [
                                                { r: r_n * r_n / 15, fill: "rgba(0,0,0,1)", delay: 0 },
                                                { r: r_n, fill: "rgba(0,0,0,1)", delay: 0 },
                                            ],
                                            easing: "linear",
                                            delay: 0,
                                            duration: 500
                                        })
                                    }
                                    dots[i].setAttribute("mode", "grow")
                                }
                            }
                        }
                    })
                    anim_list.push(anim)
                    wave.setAttribute("cx", enter_point[0])
                    wave.setAttribute("cy", enter_point[1])
                }
            })
        }

        this.shadowRoot.append(svg)
    }
}
customElements.define('makers-logo', Logo)