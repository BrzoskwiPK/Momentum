import { FC, CSSProperties } from 'react'
interface CircleIconProps {
  imageUrl: string
  size?: number
}

const CircleIcon: FC<CircleIconProps> = ({ imageUrl, size = 26 }: CircleIconProps) => {
  const containerStyle: CSSProperties = {
    width: size,
    height: size,
    borderRadius: '50%',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px solid white',
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
