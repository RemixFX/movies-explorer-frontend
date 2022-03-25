import React from 'react'
import './Preloader.css'

const Preloader = (props) => {

  const isEmpty = props.isEmptyResult

    return props.isLoading && (
        <div className="preloader">
          {isEmpty ?
          <p className='preloader__empty-result'>Ничего не найдено</p> :
            <div className="preloader__container">
                <span className="preloader__round"></span>
            </div>}
        </div>
    )
};

export default Preloader
