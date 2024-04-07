import Slider from "@mui/material/Slider";
import React, { useEffect, useState } from "react";
import s from "./price-slider.module.scss";
import { useDispatch } from "react-redux";
import { setFilter } from "store/filtersSlice";
import { useRouter } from "next/router";
import { startLoading } from "store/modalSlice.js";

//todo inconsistent currentMinMax, it changes on page refresh, when set on some points lower
const PriceSlider = ({ minMax, currentMinMax }) => {
  const router = useRouter();
  const { categoryPath } = router.query;
  const [minMaxPrice, setMinMaxPrice] = useState([
    currentMinMax[0],
    currentMinMax[1],
  ]);

  const [initialMinMaxPrice, setInitialMinMaxPrice] = useState(currentMinMax);

  const minDistance = 50; // Define your minimum distance here

  useEffect(() => {
    setMinMaxPrice([currentMinMax[0], currentMinMax[1]]);
  }, [currentMinMax]);

  const dispatch = useDispatch();
  function handleConfirm(event, newValue) {
    setInitialMinMaxPrice(minMaxPrice);
    dispatch(
      setFilter({
        filterName: "tsina",
        filterValue: [minMaxPrice[0], minMaxPrice[1]],
      })
    );
  }

  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], minMax[1] - minDistance);

        setMinMaxPrice([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setMinMaxPrice([clamped - minDistance, clamped]);
      }
    } else {
      setMinMaxPrice(newValue);
    }
  };

  const handleInputChange = (index) => (event) => {
    const newValues = [...minMaxPrice];
    newValues[index] =
      event.target.value === "" ? 0 : Number(event.target.value);
    setMinMaxPrice(newValues);
  };

  return (
    <div className={`${s.price_slider}`}>
      <div className={`${s.header}`}>
        <input
          value={minMaxPrice[0]}
          onChange={handleInputChange(0)}
          className={`form-control ${s.input} ${s.left}`}
        />
        <span>—</span>
        <input
          value={minMaxPrice[1]}
          onChange={handleInputChange(1)}
          className={`form-control ${s.input} ${s.right}`}
        />
        <button
          onClick={() => {
            if (
              minMaxPrice[0] === initialMinMaxPrice[0] &&
              minMaxPrice[1] === initialMinMaxPrice[1]
            ) {
              return;
            }
            dispatch(startLoading());
            handleConfirm();
          }}
          className={`button_primary ${s.ok_btn}`}
        >
          Ok
        </button>
      </div>
      <div className={`${s.body}`}>
        <Slider
          range="true"
          min={minMax[0]}
          max={minMax[1]}
          step={10}
          value={minMaxPrice}
          onChange={handleChange}
          className={s.slider}
          disableSwap
        />
      </div>
    </div>
  );
};

export default PriceSlider;
