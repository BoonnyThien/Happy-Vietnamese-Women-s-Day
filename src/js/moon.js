// js/moon.js
// Tạo mặt trăng với texture, inner/outer glow và ánh sáng
window.App = window.App || {};
(function(exports){
    function createMoon(scene, callback) {  // Thêm callback nếu cần sync di chuyển
        const loader = new THREE.TextureLoader();
        const moonGroup = new THREE.Group();

        loader.load('picture/moon.png', (texture) => {
            texture.wrapS = THREE.ClampToEdgeWrapping;
            texture.wrapT = THREE.ClampToEdgeWrapping;
            texture.minFilter = THREE.LinearFilter;
            texture.magFilter = THREE.LinearFilter;
            texture.repeat.set(0.6, 0.6);
            texture.offset.set(0.2, 0.2);
            texture.needsUpdate = true;

            const moonRadius = 2;
            const moonGeometry = new THREE.SphereGeometry(moonRadius, 64, 64);
            const moonMaterial = new THREE.MeshStandardMaterial({
                map: texture,
                color: 0xfff9d6,
                emissive: 0xfff9d6,
                emissiveIntensity: 0.12,
                roughness: 1.0,
                metalness: 0.0,
                transparent: true,
                alphaTest: 0.05
            });

            const moon = new THREE.Mesh(moonGeometry, moonMaterial);
            moon.position.set(-7, 0, -10);  // Giữ nguyên

            // Tạo glow và ALIGN POSITION với moon
            const innerGlowGeom = new THREE.SphereGeometry(moonRadius * 1.12, 32, 32);
            const innerGlowMat = new THREE.MeshBasicMaterial({ 
                color: 0xfff9d6, 
                transparent: true, 
                opacity: 0.14, 
                blending: THREE.AdditiveBlending, 
                depthWrite: false, 
                side: THREE.FrontSide 
            });
            const innerGlow = new THREE.Mesh(innerGlowGeom, innerGlowMat);
            innerGlow.position.copy(moon.position);  // FIX: Copy position từ moon

            const outerGlowGeom = new THREE.SphereGeometry(moonRadius * 1.6, 32, 32);
            const outerGlowMat = new THREE.MeshBasicMaterial({ 
                color: 0xfff9d6, 
                transparent: true, 
                opacity: 0.07, 
                blending: THREE.AdditiveBlending, 
                depthWrite: false, 
                side: THREE.FrontSide 
            });
            const outerGlow = new THREE.Mesh(outerGlowGeom, outerGlowMat);
            outerGlow.position.copy(moon.position);  // FIX: Copy position từ moon

            moonGroup.add(moon);
            moonGroup.add(innerGlow);
            moonGroup.add(outerGlow);

            scene.add(moonGroup);

            // Light: Align với moon để chiếu sáng glow
            const moonLight = new THREE.PointLight(0xfff9d6, 0.9, 50, 2);
            moonLight.position.copy(moon.position);  // FIX: Copy từ moon thay vì (0,0,0)
            moonLight.castShadow = true;
            scene.add(moonLight);

            const rimLight = new THREE.DirectionalLight(0xfff9d6, 0.12);
            rimLight.position.copy(moon.position);  // FIX: Copy từ moon
            scene.add(rimLight);

            // Nếu có callback, gọi sau khi add xong
            if (callback) callback(moonGroup);
        }, undefined, (err) => {
            console.warn('Moon texture failed to load, using fallback.', err);
            const moonRadius = 2;
            const moonGeometry = new THREE.SphereGeometry(moonRadius, 32, 32);
            const moonMaterial = new THREE.MeshPhongMaterial({ 
                color: 0xfdf5c9, 
                emissive: 0xfdf5c9, 
                emissiveIntensity: 0.12, 
                shininess: 0 
            });
            const moon = new THREE.Mesh(moonGeometry, moonMaterial);
            moon.position.set(-5, 0, -10);

            // Tương tự cho fallback: Align glow
            const innerGlowGeom = new THREE.SphereGeometry(moonRadius * 1.12, 32, 32);
            const innerGlowMat = new THREE.MeshBasicMaterial({ 
                color: 0xfdf5c9, 
                transparent: true, 
                opacity: 0.14, 
                blending: THREE.AdditiveBlending, 
                depthWrite: false, 
                side: THREE.FrontSide 
            });
            const innerGlow = new THREE.Mesh(innerGlowGeom, innerGlowMat);
            innerGlow.position.copy(moon.position);  // FIX

            const outerGlowGeom = new THREE.SphereGeometry(moonRadius * 1.6, 32, 32);
            const outerGlowMat = new THREE.MeshBasicMaterial({ 
                color: 0xfdf5c9, 
                transparent: true, 
                opacity: 0.07, 
                blending: THREE.AdditiveBlending, 
                depthWrite: false, 
                side: THREE.FrontSide 
            });
            const outerGlow = new THREE.Mesh(outerGlowGeom, outerGlowMat);
            outerGlow.position.copy(moon.position);  // FIX

            moonGroup.add(moon);
            moonGroup.add(innerGlow);
            moonGroup.add(outerGlow);
            scene.add(moonGroup);

            const moonLight = new THREE.PointLight(0xfdf5c9, 0.9, 50, 2);
            moonLight.position.copy(moon.position);  // Đã đúng từ trước, giữ nguyên
            moonLight.castShadow = true;
            scene.add(moonLight);

            const rimLight = new THREE.DirectionalLight(0xfdf5c9, 0.12);
            rimLight.position.copy(moon.position);  // FIX: Thống nhất với success
            scene.add(rimLight);

            moonGroup.position.set(-100, 0, -10); 

            if (callback) callback(moonGroup);
        });

        // Return group ngay, nhưng glow add async → nếu di chuyển group sớm, dùng callback để chờ
        return moonGroup;
    }

    exports.createMoon = createMoon;
})(window.App);