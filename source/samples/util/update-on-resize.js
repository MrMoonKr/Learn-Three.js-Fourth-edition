import * as THREE from 'three' ;


/**
 * 
 * @param {THREE.Camera} camera 
 * @param {THREE.Renderer} renderer 
 */
export const onResize = ( camera, renderer ) => {

    const resizer = () => {
        // 카메라 조정
        camera.aspect = window.innerWidth / window.innerHeight ;
        camera.updateProjectionMatrix() ;
        // 렌더러 조정
        renderer.setSize( window.innerWidth, window.innerHeight ) ;
    }

    window.addEventListener( 'resize', resizer, false ) ;
}

