import * as THREE from 'three' ;


/**
 * 랜덤 색상 얻기
 * @returns {THREE.Color}
 */
export const randomColor = () => {
    var r = Math.random() ;
    let g = Math.random() ;
    let b = Math.random() ;
    return new THREE.Color( r, g, b )
}
