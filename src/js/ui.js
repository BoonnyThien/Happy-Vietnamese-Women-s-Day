// js/ui.js
// Chứa các hàm UI: thay lời chúc, tắt/bật animation, chụp màn hình, tạo sao nhỏ
window.App = window.App || {};
(function(exports){
    let animationPaused = false;
    const greetings = [
        "Chúc mừng 20/10! Chúc bạn luôn xinh đẹp, hạnh phúc và thành công trong cuộc sống! ❤️"
    ];
    let currentGreeting = 0;

    function createStars() {
        const starsContainer = document.getElementById('stars');
        if (!starsContainer) return;
        for (let i = 0; i < 100; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.animationDelay = Math.random() * 3 + 's';
            starsContainer.appendChild(star);
        }
    }

    function changeGreeting() {
        currentGreeting = (currentGreeting + 1) % greetings.length;
        const greetingText = document.getElementById('greetingText');
        if (!greetingText) return;
        greetingText.style.opacity = '0';
        greetingText.style.transition = 'opacity 0.3s ease';
        setTimeout(() => {
            greetingText.innerHTML = greetings[currentGreeting];
            greetingText.style.opacity = '1';
        }, 300);
        const snack = exports.getSnack && exports.getSnack();
        const cup = exports.getCup && exports.getCup();
        const mooncake = exports.getMoonCake && exports.getMoonCake();
        

        animationPaused = !animationPaused;
        if (cup && window.gsap) {
            if (animationPaused) {
            gsap.to(cup.rotation, { y: cup.rotation.y + Math.PI * 2, duration: 1.5, ease: 'power2.inOut' });
            } else {
            gsap.to(mooncake.rotation, { y: mooncake.rotation.y + Math.PI * 2, duration: 1.5, ease: 'power2.inOut' });
            }
        }
    }
    let clickCount = 0;
    function initSimpleSwapper() {
    clickCount++;
    animationPaused = !animationPaused;
        const cup = exports.getCup && exports.getCup();
        const snack = exports.getSnack && exports.getSnack();
        const mooncake = exports.getMoonCake && exports.getMoonCake();

        if (cup && mooncake&& window.gsap) {
            if (clickCount == 1) {
                gsap.to(cup.position, { x: 0, y: 0, z: 0, duration: 0.5, ease: 'power2.out' });
                gsap.to(mooncake.position, { x: -3, y: 0, z: -1.2, duration: 0.5, ease: 'power2.out' });
                gsap.to(cup.scale, { x: 1, y: 1, z: 1, duration: 0.5, ease: 'power2.out' });
                gsap.to(mooncake.scale, { x: 0.8, y: 0.8, z: 0.8, duration: 0.5, ease: 'power2.out' });
                console.log("1");
            } else if (clickCount == 2) {
                gsap.to(cup.position, { x: 0, y: 0, z: 0, duration: 0.5, ease: 'power2.out' });
                gsap.to(mooncake.position, { x: 3, y: 0, z: -1.2, duration: 0.5, ease: 'power2.out' });
                gsap.to(cup.scale, { x: 1, y: 1, z: 1, duration: 0.5, ease: 'power2.out' });
                gsap.to(mooncake.scale, { x: 0.6, y: 0.6, z: 0.6, duration: 0.5, ease: 'power2.out' });
                console.log("2");
            } else if (clickCount == 3) {
                gsap.to(cup.position, { x: -3, y: 0, z: -1.2, duration: 0.5, ease: 'power2.out' });
                gsap.to(mooncake.position, { x: 0, y: 0, z: 0, duration: 0.5, ease: 'power2.out' });
                gsap.to(cup.scale, { x: 0.7, y: 0.7, z: 0.7, duration: 0.5, ease: 'power2.out' });
                gsap.to(mooncake.scale, { x: 1, y: 1, z: 1, duration: 0.5, ease: 'power2.out' });
                console.log("3");
            }else if (clickCount == 4) {
                gsap.to(cup.position, { x: 3, y: 0, z: -1.2, duration: 0.5, ease: 'power2.out' });
                gsap.to(mooncake.position, { x: 0, y: 0, z: 0, duration: 0.5, ease: 'power2.out' });
                gsap.to(cup.scale, { x: 0.5, y: 0.5, z: 0.5, duration: 0.5, ease: 'power2.out' });
                gsap.to(mooncake.scale, { x: 1, y: 1, z: 1, duration: 0.5, ease: 'power2.out' });
                clickCount = 0;
                console.log("4");
            }else if (clickCount == 5) {
                clickCount = 0;
                console.log("5");
            }
        }
    }

    // --- Logic hoán đổi và điều khiển item ---
    let centerItemRotationPaused = false;
    let swapperInitialized = false;
    let itemArrangement = [];
    let itemPositions = [];

    // Hàm này sẽ được gọi từ main.js sau khi scene đã sẵn sàng
    function initItemSwapper() {
        if (swapperInitialized) return;

        const scene = exports.getScene && exports.getScene();
        const camera = exports.getCamera && exports.getCamera();
        const renderer = exports.getRenderer && exports.getRenderer();
        const THREE = window.THREE;

        if (!scene || !camera || !renderer || !THREE) {
            console.log("Chưa sẵn sàng để khởi tạo swapper.");
            return;
        }

        function findObject(name, getter) {
            if (getter && typeof getter === 'function') {
                const obj = getter();
                if (obj) return obj;
            }
            const found = scene.getObjectByName(name);
            return found || null;
        }

        const mooncake = findObject('mooncake', exports.getMooncake);
        const cup = findObject('cup', exports.getCup);
        const snack = findObject('snack', exports.getSnack);

        const items = [mooncake, cup, snack].filter(Boolean);
        if (items.length < 1) return; 

        itemArrangement = [...items];

        // Tính toán vị trí
        const center = new THREE.Vector3(0, 1.2, 0); // Vị trí trung tâm cố định
        const spacing = 3.5; // Khoảng cách giữa các item

        itemPositions = [
            new THREE.Vector3(center.x - spacing, center.y, center.z),
            new THREE.Vector3(center.x, center.y, center.z),
            new THREE.Vector3(center.x + spacing, center.y, center.z)
        ];
        
        // Nếu chỉ có 1 hoặc 2 item, đặt chúng ở giữa
        if(items.length === 1) {
            itemArrangement[0].position.copy(itemPositions[1]);
        }
        if(items.length === 2) {
             itemArrangement[0].position.copy(itemPositions[0]);
             itemArrangement[1].position.copy(itemPositions[2]);
        }
        if(items.length === 3) {
            // Sắp xếp lại để cup luôn ở giữa lúc đầu
            const cupIndex = itemArrangement.findIndex(item => item.name === 'cup');
            if (cupIndex > -1) {
                const cupItem = itemArrangement.splice(cupIndex, 1)[0];
                itemArrangement.splice(1, 0, cupItem); // Đưa cup vào giữa
            }
             animateToPositions(itemArrangement, 0); // đặt item vào vị trí không cần animation lúc đầu
        }


        function animateToPositions(newArr, duration = 0.6) {
            itemArrangement = newArr;
            itemArrangement.forEach((obj, idx) => {
                if (!obj) return;
                const targetPosition = itemPositions[idx % itemPositions.length];
                const targetScale = (idx === 1) ? 1.15 : 1; // Item ở giữa to hơn

                if (window.gsap && duration > 0) {
                    gsap.to(obj.position, { x: targetPosition.x, y: targetPosition.y, z: targetPosition.z, duration, ease: 'power2.out' });
                    if (obj.scale) {
                        gsap.to(obj.scale, { x: targetScale, y: targetScale, z: targetScale, duration: duration * 0.75, ease: 'power2.out' });
                    }
                } else {
                    obj.position.copy(targetPosition);
                    if (obj.scale) obj.scale.setScalar(targetScale);
                }
            });
        }

        function swapItems() {
            if (itemArrangement.length < 2) return;
            // Xoay vòng mảng: item cuối lên đầu
            const lastItem = itemArrangement.pop();
            itemArrangement.unshift(lastItem);
            animateToPositions([...itemArrangement]);
        }

        function toggleCenterItemRotation() {
            centerItemRotationPaused = !centerItemRotationPaused;
        }
        
        // Expose các hàm mới
        exports.swapItems = swapItems;
        exports.toggleCenterItemRotation = toggleCenterItemRotation;
        exports.getCenterItem = () => itemArrangement.length > 0 ? itemArrangement[1] : null;
        exports.isCenterItemRotationPaused = () => centerItemRotationPaused;

        swapperInitialized = true;
        console.log("Item swapper đã được khởi tạo.");
    }

    // Expose hàm khởi tạo để main.js có thể gọi
    exports.initItemSwapper = initItemSwapper;
    
    function captureScreen() {
        const renderer = exports.getRenderer && exports.getRenderer();
        const scene = exports.getScene && exports.getScene();
        const camera = exports.getCamera && exports.getCamera();
        if (!renderer || !scene || !camera) return;
        renderer.render(scene, camera);
        const screenshot = renderer.domElement.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = 'tra-mai-khoi-trung-thu.png';
        link.href = screenshot;
        link.click();

        const flash = document.createElement('div');
        flash.style.position = 'fixed';
        flash.style.top = '0';
        flash.style.left = '0';
        flash.style.width = '100%';
        flash.style.height = '100%';
        flash.style.background = 'white';
        flash.style.zIndex = '9999';
        flash.style.pointerEvents = 'none';
        document.body.appendChild(flash);
        if (window.gsap) {
            gsap.to(flash, { opacity: 0, duration: 0.3, onComplete: () => flash.remove() });
        } else {
            flash.remove();
        }
    }

    // Expose to global
    exports.initSimpleSwapper = initSimpleSwapper;
    exports.changeGreeting = changeGreeting;
    exports.toggleAnimation = toggleAnimation;
    exports.captureScreen = captureScreen;
    exports.createStars = createStars;
    
    // exports.captureScreen = captureScreen; // Tạm ẩn
})(window.App);
