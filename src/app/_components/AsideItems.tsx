'use client'
import React from 'react'
import ToggleMenu from '../_Elements/ToggleMenu'
import ListOfItem from '../_Elements/ListOfItem'

export default function AsideItems() {


    return (
        <>
            <div
                className={`headerAside flex items-center justify-between text-white text-opacity-85`}
            >
                <h2
                    className={`title_site text-3xl transition-all duration-500 text-nowrap overflow-hidden`}
                >
                    Golden Bank
                </h2>
                <ToggleMenu />
            </div>
            <ListOfItem />
        </>
    )
}