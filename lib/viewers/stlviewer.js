var Viewer = function(stlstring, element) {
    this.renderer = null;
    this.controls = null;
    this.camera = null;
    this.scene = null;
    this.init(stlstring,element);
};

Viewer.prototype.init = function(stlstring, element) {

    this.container = document.getElementById(element);

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog(0x72645b, 2, 15);

    // Load STL (ASCII String)
    var loader = new THREE.STLLoader();
    var geometry = loader.parse(stlstring);
    var material = new THREE.MeshPhongMaterial({
        ambient: 0xff5533,
        color: 0xff5533,
        specular: 0x111111,
        shininess: 200
    });

    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, 0);
    // mesh.rotation.set( 0, - Math.PI / 2, 0 );
    // mesh.scale.set( 0.5, 0.5, 0.5 );
    mesh.scale.set(0.02, 0.02, 0.02); //, 0.1, 0.1 );
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    this.scene.add(mesh);
    

    // Lights
    this.scene.add(new THREE.AmbientLight(0x777777));
    this.addShadowedLight(1, 1, 1, 0xffffff, 1.35);
    this.addShadowedLight(0.5, 1, -1, 0xffaa00, 1);

    // Camera
    this.camera = new THREE.PerspectiveCamera(35, this.container.clientWidth / this.container.clientHeight, 0.1, 100);
    this.camera.position.set(0, -1, 1);
    this.scene.add(this.camera);

    // renderer
    this.renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.setClearColor(this.scene.fog.color, 1);
    this.renderer.gammaInput = true;
    this.renderer.gammaOutput = true;
    this.renderer.shadowMapEnabled = true;
    this.renderer.shadowMapCullFace = THREE.CullFaceBack;
    this.container.appendChild(this.renderer.domElement);


    this.controls = new THREE.TrackballControls( this.camera, this.renderer.domElement);
    this.controls.rotateSpeed = 1.0;
    this.controls.zoomSpeed = 1.2;
    this.controls.panSpeed = 0.2;
    this.controls.noZoom = false;
    this.controls.noPan = false;
    this.controls.staticMoving = false;
    this.controls.dynamicDampingFactor = 0.3;
    this.controls.keys = [65, 83, 68];

    // stats
    // stats = new Stats();
    // stats.domElement.style.position = 'absolute';
    // stats.domElement.style.top = '0px';
    // container.appendChild( stats.domElement );
    //
    window.addEventListener('resize', this.onWindowResize.bind(this), false );
}
Viewer.prototype.addShadowedLight = function(x, y, z, color, intensity) {
    var directionalLight = new THREE.DirectionalLight(color, intensity);
    directionalLight.position.set(x, y, z)
    this.scene.add(directionalLight);
    directionalLight.castShadow = true;
    // directionalLight.shadowCameraVisible = true;
    var d = 1;
    directionalLight.shadowCameraLeft = -d;
    directionalLight.shadowCameraRight = d;
    directionalLight.shadowCameraTop = d;
    directionalLight.shadowCameraBottom = -d;
    directionalLight.shadowCameraNear = 1;
    directionalLight.shadowCameraFar = 4;
    directionalLight.shadowMapWidth = 1024;
    directionalLight.shadowMapHeight = 1024;
    directionalLight.shadowBias = -0.005;
    directionalLight.shadowDarkness = 0.15;
}
Viewer.prototype.onWindowResize = function() {
    // console.log("resized:" + container.id);
    this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
}

Viewer.prototype.render = function() {
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
}