/** A decorative architecture sketch, not a live execution log. */
export default function AsciiTrace() {
	return (
		<pre className="ascii-trace" aria-hidden="true">
			<span className="ascii-trace__rule">{"+--------------------------------+\n"}</span>
			<span>{"|  task                          |\n"}</span>
			<span>{"|   |                            |\n"}</span>
			<span className="ascii-trace__step">{"|   +--> [ observe ]             |\n"}</span>
			<span className="ascii-trace__step">{"|           |                    |\n|        [ decide  ]             |\n"}</span>
			<span className="ascii-trace__step">{"|           |                    |\n|        [   act   ]             |\n"}</span>
			<span className="ascii-trace__step">{"|           |                    |\n|        [ verify ] --> evidence |\n"}</span>
			<span className="ascii-trace__rule">{"+--------------------------------+"}</span>
		</pre>
	);
}
