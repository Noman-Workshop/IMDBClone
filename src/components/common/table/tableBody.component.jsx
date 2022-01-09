/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-plusplus */
import propTypes, { object } from 'prop-types';
import React from 'react';

const TableBody = ({ data, metadata }) => {
	let tableKey;
	try {
		[[tableKey]] = Object.entries(metadata).filter(
			([, { key }]) => key === true
		);
	} catch (error) {
		// no handling
	}

	const renderColumns = Object.entries(metadata)
		.filter(
			([col, { render }]) =>
				render !== undefined &&
				!(metadata.exclude && metadata.exclude.includes(col))
		)
		.map(([key]) => key);

	let nonce = 0;
	return (
		<tbody>
			{data.map((row) => (
				<tr key={`tr${TableBody.nonce++}${tableKey ? row[tableKey] : nonce}`}>
					{renderColumns.map((col) => (
						<td key={`td${nonce++}`}>{metadata[col].render(row[col], row)}</td>
					))}
				</tr>
			))}
		</tbody>
	);
};

TableBody.propTypes = {
	data: propTypes.arrayOf(object).isRequired,
	metadata: object.isRequired,
};

TableBody.nonce = 0;

export default TableBody;
