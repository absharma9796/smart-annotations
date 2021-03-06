import React, { FC } from 'react';


const BodyLayout: FC = (props) => {

    return (
        <div className={`flex justify-center relative bg-amber-50/20 dark:bg-gray-700 max-h-full h-full overflow-auto`}
            style={{
                height: 'calc(100vh - 3.5rem)',
            }}
        >
            <div className="flex container w-full max-w-7xl px-2 sm:px-10">
                {props.children}
            </div>
        </div>
    )
}

export default BodyLayout;
