import React, {FC, createRef, useState, useEffect} from 'react';
import { YMaps, Map, Placemark } from "react-yandex-maps";
import "../components/styles/Map.css";
import {Layout} from 'antd';

interface MapState {
    center: Array<number>,
    zoom: number,
    controls: Array<any>
}

interface MapProps {
    width?: string,
    height?: string,
    mapCoords?: MapState
}

const mapState: MapState = {
    center: [55.76, 37.64],
    zoom: 13,
    controls: []
};

export const MapComponent: FC<MapProps> = ({width, height, mapCoords}) => {
    const inputRef: any = createRef();
    const [addressCoord, setAddressCoord] = useState([] as number[]);
    const [inputValue, setInputValue] = useState("");
    const [savedYmaps, setSavedYmaps] = useState();
    const [isHideYandexInput, setIsHideYandexInput] = useState(false);

    useEffect(() => {
        if (mapCoords) {
            setAddressCoord(mapCoords.center)
        }
    }, [mapCoords])

    const onClickAddress = (e: any, ymaps: any) => {
        const name = e.get("item").value;
        setInputValue(name);
        ymaps.geocode(name).then((result: any) => {
            const coord = result.geoObjects.get(0).geometry.getCoordinates();
            setAddressCoord(coord);
        });
    };

    const onYmapsLoad = (ymaps: any) => {
        setSavedYmaps(ymaps);
        const suggestView = new ymaps.SuggestView(inputRef.current);
        suggestView.events.add("select", (e: any) => {
            return onClickAddress(e, ymaps);
        });
    };

    const onClickToMap = async (e: any) => {
        const coords = e.get("coords");
        setAddressCoord(coords);
        // @ts-ignore
        const result = await savedYmaps.geocode(coords);
        const firstGeoObject = result.geoObjects.get(0);
        setInputValue(firstGeoObject.getAddressLine());
        setIsHideYandexInput(true);
    };
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    return (
        <Layout>
            <div
                className={
                    isHideYandexInput
                        ? "input__wrapper_hide-dropdown"
                        : "input__wrapper_show-dropdown"
                }
            >
                <input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Инпут"
                    onFocus={() => setIsHideYandexInput(false)}
                />
            </div>
            <YMaps
                query={{
                    load: "package.full",
                    apikey: "YOUR KEY"
                }}
            >
                <Map
                    state={
                        mapCoords
                        ?
                        addressCoord ? { ...mapCoords, center: addressCoord } : mapCoords
                        :
                        addressCoord ? { ...mapState, center: addressCoord } : mapState
                    }
                    onLoad={onYmapsLoad}
                    width={width ? width : "100%"}
                    height={height ? height : "550px"}
                    onClick={onClickToMap}
                >
                    {addressCoord && <Placemark geometry={addressCoord} />}
                </Map>
            </YMaps>
        </Layout>
    )
}
