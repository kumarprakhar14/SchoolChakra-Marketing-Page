/**
 * Brand wordmark rendered in Montserrat SemiBold (600) with the exact
 * SchoolChakra brand colors (#001A65 and #0066D6). Size inherits from parent
 * or can be customized per usage via `className` / `style`.
 */
export function Wordmark({ className = '', style = {} }) {
  return (
    <span
      className={`inline-block whitespace-nowrap select-none ${className}`}
      style={{
        fontFamily: "var(--font-montserrat, 'Montserrat'), sans-serif",
        fontWeight: 600,
        letterSpacing: '0.12em',
        ...style,
      }}
    >
      <span style={{ color: '#001A65' }}>SCHOOL</span>
      {/* {' '} */}
      <span style={{ color: '#0066D6' }}>CHAKRA</span>
    </span>
  );
}

export default Wordmark;
