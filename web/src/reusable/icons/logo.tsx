import * as React from "react";
import { CustomIconProps } from ".";

interface AppLogoProps extends CustomIconProps {
    size: number;
}

const AppLogo: React.FC<AppLogoProps> = ({
    size,
    ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size || '300px'}
    height={size || '300px'}
    viewBox="0 0 314.544 396.536"
    {...props}
  >
    <g fill="none" stroke="#33363a" strokeLinecap="round" strokeWidth={24}>
      <path data-name="Line 3" d="m157.697 12.075.385 61.527" />
      <path
        data-name="Line 5"
        d="m118.117 29.6 36.49 49.549"
        strokeWidth={24.00264}
      />
      <path
        data-name="Line 4"
        d="m198.119 29.374-35.866 50.002"
        strokeWidth={24.00264}
      />
    </g>
    <g data-name="Union 1" fill="#ffd400">
      <path d="m158.048 325.884-.382-.012-.197-.013-.972.025c-51.32 0-94.42-13.493-118.25-37.019C18.89 269.757 6 250.681 6 219.692c0-32.795 10.846-58.055 40.018-93.2 29.2-29.412 69.598-46.506 110.479-46.506h.176l.951.012h.045c41.291 0 81.667 17.09 111.214 46.886 28.816 34.753 39.661 60.013 39.661 92.808 0 30.989-12.89 50.065-32.246 69.173-23.83 23.526-66.93 37.02-118.25 37.02Z" />
      <path
        d="M158.048 319.884c49.754 0 91.318-12.862 114.034-35.289 18.807-18.566 30.462-35.899 30.462-64.903 0-31.089-10.387-55.242-38.291-88.955-28.405-28.447-67.084-44.751-106.276-44.749l-1.48-.002c-39.122 0-77.8 16.304-106.205 44.75C22.388 164.45 12 188.604 12 219.693c0 29.004 11.656 46.337 30.462 64.903 22.716 22.427 64.28 35.29 114.035 35.29h1.55m0 12c-.26 0-.517-.01-.775-.026a11.86 11.86 0 0 1-.775.025c-47.192 0-94.953-11.587-122.466-38.75C12.81 272.185 0 251.81 0 219.693c0-34.565 11.846-61.425 41.401-97.033 29.649-29.897 70.65-48.673 115.096-48.673.26 0 .518.008.775.023.258-.015.515-.023.776-.023 44.444 0 85.447 18.776 115.095 48.673 29.556 35.608 41.401 62.468 41.401 97.033 0 32.118-12.809 52.492-34.031 73.443-27.513 27.162-75.274 38.75-122.465 38.75Z"
        fill="#33363a"
      />
    </g>
    <path
      data-name="Path 5"
      d="M56.985 188.502c5.436-12 18.12-13.59 25.594-13.363s19.479-1.132 24.008 11.778"
      fill="none"
      stroke="#33363a"
      strokeLinecap="round"
      strokeWidth={10}
    />
    <path
      data-name="Path 6"
      d="M207.726 188.502c5.436-12 18.12-13.59 25.594-13.363s19.479-1.132 24.008 11.778"
      fill="none"
      stroke="#33363a"
      strokeLinecap="round"
      strokeWidth={10}
    />
    <g stroke="#33363a" strokeWidth={12}>
      <path
        data-name="Union 2"
        d="M157.484 390.53c-78.268.356-104.808-14.2-120.105-56.651-15.311-42.488 27.56-66.985 53.588-83.062s37.893-47.465 46.316-60.479c7.764-12 18.563-10.332 20.2-10 1.639-.333 12.438-2 20.2 10 8.421 13.014 20.287 44.4 46.316 60.478s68.9 40.575 53.589 83.062c-15.115 41.943-41.214 56.656-117.338 56.658-.916 0-1.833-.002-2.766-.006Z"
        fill="#e0d5a4"
      />
      <path
        data-name="Line 1"
        fill="none"
        strokeLinecap="round"
        d="m141.931 227.418 3.076 7.691"
      />
      <path
        data-name="Line 2"
        fill="none"
        strokeLinecap="round"
        d="m174.232 227.418-3.076 7.691"
      />
    </g>
  </svg>
)

export default AppLogo;
