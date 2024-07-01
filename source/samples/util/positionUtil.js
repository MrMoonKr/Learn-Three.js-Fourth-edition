import * as THREE from "three" ;


/**
 * 
 * @param {*} param0 
 * @returns 
 */
export const randomVector = ( {
    xRange: {
        fromX = 0,
        toX = 1
    },
    yRange: {
        fromY = 0,
        toY = 1
    },
    zRange: {
        fromZ = 0,
        toZ = 1
    },
} ) => {

    const x = Math.random() * ( toX - fromX ) + fromX ;
    const y = Math.random() * ( toY - fromY ) + fromY ;
    const z = Math.random() * ( toZ - fromZ ) + fromZ ;

    return new THREE.Vector3( x, y, z ) ;
}
