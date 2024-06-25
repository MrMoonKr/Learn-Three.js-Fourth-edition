import * as THREE from "three";
import GUI from "lil-gui";

/**
 * 전달된 주변조명으로 GUI 항목 생성
 * @param {GUI} gui 
 * @param {THREE.Light} light 
 */
export const initializeAmbientLightControls = (gui, light) => {

    const colorHolder = new THREE.Color( light.color );

    const ambientLightProps = {
        color: colorHolder.getStyle(),
        intensity: light.intensity,
    };

    const ambienLightFolder = gui.addFolder( "Ambient Light" );
    ambienLightFolder
        .add( ambientLightProps, "intensity", 0, 5, 0.1 )
        .onChange( ( i ) => {
            light.intensity = i ;
        } ) ;
    ambienLightFolder
        .addColor( ambientLightProps, "color" )
        .onChange( ( c ) => {
            light.color.setStyle( c ) ;
        } );
};
