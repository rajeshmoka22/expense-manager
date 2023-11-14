interface IProps {
  progress: number | string,
  color?: string,
  progressColor?: string
}

export const ProgressBar = (props: IProps) => {
  const {progress, color='bg-neutral-200', progressColor} = props;
  return (
    <>
      <div className={`h-2 w-full rounded ${color}`}>
        <div className={`h-2 rounded ${progressColor || 'bg-blue-600'}`} style={{ width: `${progress}%`}}></div>
      </div>
    </>
  )
}