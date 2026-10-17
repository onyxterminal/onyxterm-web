/**
 * The Onyx mark rendered as ASCII, rasterised from the real SVG paths
 * in logos/logo-light-mode.svg — not hand-drawn.
 */
const ART = [
  '             ####+:                 ',
  '            :#######+:.             ',
  '            :##########++.          ',
  '            :##############+:.      ',
  '            :#################+:.   ',
  '  ::        .#####################+.',
  '+####+:.     .+#####################',
  '########+:.     :+##################',
  '############+.     :+###############',
  '###############+:     :#############',
  '##################+.   :############',
  '####################   :############',
  '####################   :############',
  '####################   :############',
  '####################   :##########+:',
  ' :+#################   :#######+:.  ',
  '   .:+##############   :###+:.      ',
  '      .:+###########   .::          ',
  '         .:+########                ',
  '            .+######                ',
  '               .+##+                ',
]

export default function AsciiLogo({ className = '', dim = false }) {
  return (
    <pre
      className={`pixel overflow-x-auto text-[7px] leading-[1.12] leading-none whitespace-pre sm:text-[8px] ${dim ? 'text-faint' : 'text-ink'} ${className}`}
      aria-label="Onyx logo, rendered as ASCII art"
    >
      {ART.join('\n')}
    </pre>
  )
}