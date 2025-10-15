import { toast } from "react-toastify"

const SingleColor = ({index,color}) => {
  const { hex, weight } = color
  const saveToClipboard = async () => {
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(`#${hex}`)
        toast.success('Copied to clipboard')
      } catch (error) {
        toast.error('Failed to copy to clipboard')
      }
    } else {
      toast.error('Your browser does not support clipboard API')
    }
  }
  return (
    <article 
      className={index > 10 ? 'color color-light' : 'color'} 
      style={{background: `#${hex}`}}
      onClick={saveToClipboard}
    >
      <p className="persen-value">{weight}%</p>
      <p className="color-value">#{hex}%</p>
    </article>
  )
}

export default SingleColor