import React, {  memo } from "react";
import css from "./style.module.css";
//LIBS
import cn from "classnames";
//REDUX
import {
  filterEsploraPageSelector,
  handleGeneriClicked,
  selectCategory,
  handleProviderClicked,
  settingOrderBy,
  settingReleaseDate,
} from "@redux-slices/slices";
import { useAppSelector, useAppDispatch } from "@redux-hooks";
import {
  IProvider,
  IGenere,
} from "@redux-slices/filter-esplora-page/interface";
import { BsXLg } from "react-icons/bs";

const Filter: React.VFC = () => {
  //STATE
  const dispatch = useAppDispatch();
  const { generi, provider, filterCategory, setting } = useAppSelector(
    filterEsploraPageSelector
  );

  const max = new Date().getFullYear();
  const min = max - 100;

  let years: number[] = [];
  let yearsReverse: number[] = [];

  (function () {
    for (let i = max; i >= min; i--) {
      years.push(i);
    }
    for (let i = min; i <= max; i++) {
      yearsReverse.push(i);
    }
  })();

  //FUNC
  const handleGeneri = (ele: IGenere) => {
    dispatch(handleGeneriClicked(ele));
  };
  const handleProvider = (ele: IProvider) => {
    dispatch(handleProviderClicked(ele));
    return ele;
  };

  const selectCat = (name: string) => {
    dispatch(selectCategory(name));
  };
  const sortBy = (name: string) => {
    dispatch(settingOrderBy(name));
  };

  const handleDate = (e: { target: HTMLSelectElement }) => {
    dispatch(
      settingReleaseDate({ name: e.target.name, value: e.target.value })
    );
  };

  return (
    <div className={css.filter}>
      <h3 className={css.title}>Cosa vuoi vedere ?</h3>
      {/* HEADER FILTERS */}
      <div className={css.filterHeader}>
        <button
          className={cn(css.btnHeader, {
            [css.active]: filterCategory === "generi",
          })}
          onClick={() => selectCat("generi")}
        >
          GENERI
        </button>
        <button
          className={cn(css.btnHeader, {
            [css.active]: filterCategory === "provider",
          })}
          onClick={() => selectCat("provider")}
        >
          SERVIZI STREAMING
        </button>

        <button
          className={cn(css.btnHeader, {
            [css.active]: filterCategory === "setting",
          })}
          onClick={() => selectCat("setting")}
        >
          FILTRI
        </button>
      </div>
      {/* BODY FILTERS */}

      {/* SERVIZI STREAMING SECTION */}
      <div className={css.filterButtons}>
        {filterCategory === "provider" &&
          provider &&
          provider
            .filter((ele: IProvider) => ele.display_priority < 22)
            .map((ele: IProvider) => (
              <button
                className={cn(css.btn, { [css.active]: ele.clicked })}
                onClick={() => handleProvider(ele)}
                key={ele.provider_id}
              >
                {ele.provider_name}
              </button>
            ))}
      </div>
      {/* GENERI SECTION */}
      <div className={css.filterButtons}>
        {filterCategory === "generi" &&
          generi &&
          generi.map((ele: IGenere) => (
            <button
              className={cn(css.btn, { [css.active]: ele.clicked })}
              onClick={() => handleGeneri(ele)}
              key={ele.id}
            >
              {ele.name}
            </button>
          ))}
      </div>
      {/* FILTRI SECTION */}
      <div className={css.filterButtons}>
        {filterCategory === "setting" && (
          <div className={css.settingContainer}>
            <div>
              <h3 className={css.titleSetting}>Ordina in base a:</h3>
              <button
                className={cn(css.btnSetting, {
                  [css.active]: setting.sortBy === "popularity.desc",
                })}
                onClick={() => sortBy("popularity.desc")}
              >
                Popolarità
              </button>
              <button
                className={cn(css.btnSetting, {
                  [css.active]: setting.sortBy === "vote_average.desc",
                })}
                onClick={() => sortBy("vote_average.desc")}
              >
                Media voti
              </button>
              <button
                className={cn(css.btnSetting, {
                  [css.active]: setting.sortBy === "vote_count.desc",
                })}
                onClick={() => sortBy("vote_count.desc")}
              >
                Numero di voti
              </button>
            </div>
            {/* SETTING DATE */}

            <div>
              <h3 className={css.titleSetting}>
                Filtra in base all'anno di uscita:
              </h3>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div className={css.containerDate}>
                  <h3 className={css.infoTitle}>Dal</h3>
                  <select
                    onChange={handleDate}
                    name="releaseDateGTE"
                    id="releaseDateGTE"
                    value={setting.releaseDateGTE}
                  >
                    {yearsReverse.map((ele) => (
                      <option key={ele} value={ele}>
                        {ele}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={css.containerDate}>
                  <h3 className={css.infoTitle}>Al </h3>
                  <select
                    onChange={handleDate}
                    name="releaseDateLTE"
                    id="releaseDateLTE"
                    value={setting.releaseDateLTE}
                  >
                    {years.map((ele) => (
                      <option key={ele} value={ele}>
                        {ele}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* FOOTER */}
      <div className={css.filterFooter}>
        {generi &&
          generi
            .filter((ele) => ele.clicked === true)
            .map((ele: IGenere) => (
              <button
                className={cn(css.btnFooter, { [css.active]: ele.clicked })}
                onClick={() => handleGeneri(ele)}
                key={ele.id}
              >
                {ele.name}
                <span className={css.iconX}>
                  <BsXLg />
                </span>
              </button>
            ))}
        {provider &&
          provider
            .filter((ele) => ele.clicked === true)
            .map((ele: IProvider) => (
              <button
                className={cn(css.btnFooter, { [css.active]: ele.clicked })}
                onClick={() => handleProvider(ele)}
                key={ele.provider_id}
              >
                {ele.provider_name}
                <span className={css.iconX}>
                  <BsXLg />
                </span>
              </button>
            ))}
      </div>
    </div>
  );
};

export default memo(Filter);
