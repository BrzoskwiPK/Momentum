import { FC, CSSProperties } from 'react'

interface CircleIconProps {
  imageUrl: string
  size?: number
  withBorder?: boolean
}

const CircleIcon: FC<CircleIconProps> = ({
  imageUrl,
  size,
  withBorder = true,
}: CircleIconProps) => {
  const containerStyle: CSSProperties = {
    minWidth: !size ? '34px' : '26px',
    minHeight: !size ? '34px' : '26px',
    width: size,
    height: size,
    borderRadius: '50%',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: withBorder ? '2px solid white' : 'none',
    marginRight: '0.5rem',
    marginLeft: '-0.1rem',
  }

  const imageStyle: CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '50%',
  }

  return (
    <div style={containerStyle}>
      <img src={imageUrl} alt='Profile Icon' style={imageStyle} />
    </div>
  )
}

export default CircleIcon
