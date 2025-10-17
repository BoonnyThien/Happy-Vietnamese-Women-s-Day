// js/main.js
// File chính: khởi tạo, lắng nghe sự kiện, và chạy animation khởi động
window.App = window.App || {};
(function(exports){
    function init() {
        const container = document.getElementById('canvas-container');
        if (!container) {
            console.error('Không tìm thấy #canvas-container');
            return;
        }

        // Khởi tạo scene 3D
        exports.initScene(container);

        // Tạo sao nền
        exports.createStars && exports.createStars();

        // Ẩn loader sau vài giây
        setTimeout(() => {
            const loader = document.getElementById('loader');
            if (loader) {
                loader.style.opacity = '0';
                setTimeout(() => loader.style.display = 'none', 1000);
            }
        }, 2000);

        // Event resize
        window.addEventListener('resize', () => {
            const renderer = exports.getRenderer && exports.getRenderer();
            const camera = exports.getCamera && exports.getCamera();
            if (!renderer || !camera) return;
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        // Simple orbit-style controls (drag to rotate, wheel/pinch to zoom).
        (function(){
            let isPointerDown = false;
            let isTouchPinching = false;
            let lastX = 0, lastY = 0;
            let pinchStartDist = 0;
            let pinchStartRadius = 0;

            const ROTATE_SPEED = 0.005;
            const ZOOM_SPEED = 0.01;
            const MIN_RADIUS = 5;
            const MAX_RADIUS = 80;

            // tọa độ hình cầu
            let yaw = 0;    // theta
            let pitch = Math.PI / 2; // phi
            let radius = 20;

            function updateFromCamera(camera) {
            if (!camera) return;
            const p = camera.position;
            const r = Math.sqrt(p.x*p.x + p.y*p.y + p.z*p.z) || 1;
            radius = r;
            // PHI (cao độ) được đo từ trục +y
            pitch = Math.acos(Math.max(-1, Math.min(1, p.y / r)));
            // theta (yaw)
            yaw = Math.atan2(p.x, p.z);
            }

            function applySphericalToCamera(camera) {
            if (!camera) return;
            // Tránh lật
            const phi = Math.max(0.1, Math.min(Math.PI - 0.1, pitch));
            const theta = yaw;
            const r = Math.max(MIN_RADIUS, Math.min(MAX_RADIUS, radius));
            const sinPhi = Math.sin(phi);
            camera.position.x = r * sinPhi * Math.sin(theta);
            camera.position.y = r * Math.cos(phi);
            camera.position.z = r * sinPhi * Math.cos(theta);
            camera.lookAt(0, 0, 0);
            }

            // Khởi tạo từ máy ảnh hiện tại (nếu có)
            const initCamera = exports.getCamera && exports.getCamera();
            if (initCamera) updateFromCamera(initCamera);

            // Mouse handlers
            window.addEventListener('mousedown', (e) => {
            isPointerDown = true;
            lastX = e.clientX;
            lastY = e.clientY;
            });

            window.addEventListener('mousemove', (e) => {
            const camera = exports.getCamera && exports.getCamera();
            if (!camera) return;
            if (!isPointerDown) return;
            const dx = e.clientX - lastX;
            const dy = e.clientY - lastY;
            lastX = e.clientX;
            lastY = e.clientY;
            yaw -= dx * ROTATE_SPEED;
            pitch -= dy * ROTATE_SPEED;
            applySphericalToCamera(camera);
            });

            window.addEventListener('mouseup', () => { isPointerDown = false; });
            window.addEventListener('mouseleave', () => { isPointerDown = false; });

            // Wheel zoom
            window.addEventListener('wheel', (e) => {
            const camera = exports.getCamera && exports.getCamera();
            if (!camera) return;
            // deltaY > 0 scroll down => zoom out (increase radius)
            radius += e.deltaY * ZOOM_SPEED;
            radius = Math.max(MIN_RADIUS, Math.min(MAX_RADIUS, radius));
            applySphericalToCamera(camera);
            }, { passive: true });

            // Touch handlers (single finger rotate, two-finger pinch zoom)
            window.addEventListener('touchstart', (e) => {
            const camera = exports.getCamera && exports.getCamera();
            if (!camera) return;
            if (e.touches.length === 1) {
                isPointerDown = true;
                lastX = e.touches[0].clientX;
                lastY = e.touches[0].clientY;
                isTouchPinching = false;
            } else if (e.touches.length === 2) {
                isTouchPinching = true;
                isPointerDown = false;
                const dx = e.touches[0].clientX - e.touches[1].clientX;
                const dy = e.touches[0].clientY - e.touches[1].clientY;
                pinchStartDist = Math.sqrt(dx*dx + dy*dy);
                pinchStartRadius = radius;
            }
            }, { passive: false });

            window.addEventListener('touchmove', (e) => {
            const camera = exports.getCamera && exports.getCamera();
            if (!camera) return;
            if (isTouchPinching && e.touches.length === 2) {
                // pinch to zoom
                const dx = e.touches[0].clientX - e.touches[1].clientX;
                const dy = e.touches[0].clientY - e.touches[1].clientY;
                const dist = Math.sqrt(dx*dx + dy*dy);
                const diff = dist - pinchStartDist;
                radius = pinchStartRadius - diff * ZOOM_SPEED * 0.5;
                radius = Math.max(MIN_RADIUS, Math.min(MAX_RADIUS, radius));
                applySphericalToCamera(camera);
                e.preventDefault();
            } else if (isPointerDown && e.touches.length === 1) {
                const touch = e.touches[0];
                const dx = touch.clientX - lastX;
                const dy = touch.clientY - lastY;
                lastX = touch.clientX;
                lastY = touch.clientY;
                yaw -= dx * ROTATE_SPEED;
                pitch -= dy * ROTATE_SPEED;
                applySphericalToCamera(camera);
                e.preventDefault();
            }
            }, { passive: false });

            window.addEventListener('touchend', (e) => {
            if (e.touches.length === 0) {
                isPointerDown = false;
                isTouchPinching = false;
            } else if (e.touches.length === 1) {
                // went from pinch to single touch
                isTouchPinching = false;
                isPointerDown = true;
                lastX = e.touches[0].clientX;
                lastY = e.touches[0].clientY;
            }
            });

            // Trong trường hợp camera được thay thế sau, đảm bảo các điều khiển vẫn phản ánh camera mới
            // bằng cách áp dụng các giá trị hình cầu bất cứ khi nào hoạt ảnh chạy (an toàn khi gọi nhiều lần).
            // Hiển thị một chức năng nhỏ để sử dụng bên ngoài (tùy chọn)
            exports.__applyOrbitControls = function() {
            const camera = exports.getCamera && exports.getCamera();
            if (!camera) return;
            applySphericalToCamera(camera);
            };
        })();

        // Khởi chạy vòng lặp animation
        exports.animateScene && exports.animateScene(false);

        // Khởi tạo item swapper sau khi scene đã sẵn sàng
        exports.initItemSwapper && exports.initItemSwapper();

        // GSAP intro animations (nếu đã tải)
        const cup = exports.getCup && exports.getCup();
        const moon = exports.getMoon && exports.getMoon();
        const snack = exports.getSnack && exports.getSnack();
        const moonCake = exports.getMoonCake && exports.getMoonCake();

        if (window.gsap) {
            const introEase = 'power2.out';
            const introDuration = 2.5;
            // Animation nổi lên cho tất cả các item có thể có
            if (cup) gsap.from(cup.position, { y: -5, duration: introDuration, ease: 'bounce.out', delay: 0.2 });
            if (moonCake) gsap.from(moonCake.position, { y: -5, duration: introDuration, ease: 'bounce.out', delay: 0.4 });
            if (snack) gsap.from(snack.position, { y: -5, duration: introDuration, ease: 'bounce.out', delay: 0.2 });
            
            if (moon) gsap.from(moon.position, { x: -20, duration: 3, ease: introEase });
        }
    }

    // Khi trang load xong
    window.addEventListener('load', () => {
        // Kiểm tra thư viện cần thiết
        if (!window.THREE) {
            console.error('Thiếu thư viện: Three.js');
            // Vẫn tiếp tục để UI cơ bản hoạt động
        }
        init();
    });

    // Export (nếu cần)
    exports.init = init;
})(window.App);

// Expose các hàm UI ra global để các thẻ onclick trong HTML vẫn hoạt động
// Lưu ý: các hàm cũ đã được thay thế bằng các hàm mới trong ui.js
// window.changeGreeting, window.App.toggleCenterItemRotation, window.App.swapItems
// Các hàm này đã được gán trực tiếp trong HTML: onclick="window.App.functionName()"

