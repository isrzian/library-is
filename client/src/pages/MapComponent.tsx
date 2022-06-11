import React, {FC, createRef, useState} from 'react';
import { YMaps, Map, Placemark } from "react-yandex-maps";
import "../components/styles/Map.css";
import {Layout} from 'antd';

const mapState = {
    center: [55.76, 37.64],
    zoom: 13,
    controls: []
};

export const MapComponent: FC = () => {
    const inputRef: any = createRef();

    const [addressCoord, setAddressCoord] = useState();
    const [inputValue, setInputValue] = useState("");
    const [savedYmaps, setSavedYmaps] = useState();
    const [isHideYandexInput, setIsHideYandexInput] = useState(false);

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
                        addressCoord ? { ...mapState, center: addressCoord } : mapState
                    }
                    onLoad={onYmapsLoad}
                    width="100%"
                    height="550px"
                    onClick={onClickToMap}
                >
                    {addressCoord && <Placemark geometry={addressCoord} />}
                </Map>
            </YMaps>
        </Layout>
    )
}
