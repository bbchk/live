import s from './sort-group.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, deleteFilter } from 'store/slices/filters.slice';
import { transliterate } from '@bbuukk/slugtrans/transliterate';
import { slugify } from '@bbuukk/slugtrans/slugify';
import { useEffect, useState } from 'react';
import { startLoading } from 'store/slices/global_comps/global_comps.slice.js';

//todo add funcitonality
const SortGroup = () => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.filters);

  const slugFilterLabel = slugify(transliterate('сортування'));
  const handleChange = (event) => {
    dispatch(startLoading());
    const value = event.target.value;
    const slugValue = slugify(transliterate(value));
    dispatch(
      setFilter({
        filterName: slugFilterLabel,
        filterValue: [slugValue],
      }),
    );
  };

  return (
    <search className={`${s.filters}`}>
      <select
        aria-label="Сортувати товари за:"
        className={`form-select ${s.select}`}
        onChange={handleChange}
      >
        {[
          'За рейтингом',
          'Від дешевших до дорогих',
          'Від дорогих до дешевих',
        ].map((option) => {
          const isSelected = filters[slugFilterLabel]?.includes(
            slugify(transliterate(option)),
          );

          return (
            <option key={option} selected={isSelected} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    </search>
  );
};

export default SortGroup;
