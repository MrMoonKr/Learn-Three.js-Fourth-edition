import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { initOrbitControls } from '../controller/orbit-controller';
import { initLighting } from './lighting';
import { onResize } from '../util/update-on-resize';


/**
 * 
 * @param {Object} props 
 * @param {THREE.ColorRepresentation} props.backgroundColor
 * @param {THREE.ColorRepresentation} props.fogColor
 * @param {boolean} props.disableShadows
 * @param {boolean} props.disableLights
 * @param {boolean} props.disableDefaultControls
 * @returns 
 */
export const initScene = ( { backgroundColor, fogColor, disableShadows, disableLights, disableDefaultControls } ) => {

    /**
     * @typedef {Object} InitResult
     * @property {THREE.Scene} scene
     * @property {THREE.Camera} camera
     * @property {THREE.Renderer} renderer
     * @property {OrbitControls} orbitControls
     */
    /**
     * 
     * @param {function(InitResult)} fn 
     */
    const init = ( fn ) => {

        // basic scene setup
        const scene = new THREE.Scene();
        if ( backgroundColor ) {
            scene.background = backgroundColor;
        }

        if ( fogColor ) {
            scene.fog = new THREE.Fog( fogColor, 0.0025, 50 );
        }

        // setup camera and basic renderer
        const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 100000.0 );
        const renderer = new THREE.WebGLRenderer( {
            antialias: true
        } );
        //renderer.outputEncoding = THREE.sRGBEncoding
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.VSMShadowMap;
        renderer.setClearColor( backgroundColor );

        onResize( camera, renderer );
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( renderer.domElement );

        // initialize orbit controls
        let orbitControls
        if ( !disableDefaultControls ) {
            orbitControls = initOrbitControls( camera, renderer );
        }

        // add some basic lighting to the scene
        if ( !disableLights ?? false ) {
            initLighting( scene, {
                disableShadows
            } );
        }

        fn( { scene, camera, renderer, orbitControls } );
    }

    return init
}
