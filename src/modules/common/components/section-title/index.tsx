type SectionTitleProps = {
  subtitle: string
  titleLine1: string
  titleLine2: string
}

const SectionTitle = ({ subtitle, titleLine1, titleLine2 }: SectionTitleProps) => {
  return (
    <div className="flex flex-col items-center mb-12">
      <span className="mb-2" style={{ fontSize: '14px', fontWeight: 500, color: '#6b6b6b' }}>
        {subtitle}
      </span>
      <h2 className="text-grey-90 text-center text-3xl lg:text-[46px] leading-tight lg:leading-[55.2px]" style={{ fontWeight: 500 }}>
        {titleLine1}
        <br />
        {titleLine2}
      </h2>
    </div>
  )
}

export default SectionTitle

