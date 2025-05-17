import { useRef } from 'react';
import type { MouseEventHandler } from 'react';
import clsx from 'clsx';
import { OptionType } from 'src/constants/articleProps';
import { Text } from 'src/ui/text';
import { isFontFamilyClass } from './helpers/isFontFamilyClass';
import { useEnterOptionSubmit } from './hooks/useEnterOptionSubmit';

import styles from './Select.module.scss';

type OptionProps = {
	option: OptionType;
	onClick: (value: OptionType['value']) => void;
};

export const Option = (props: OptionProps) => {
	const {
		option: { value, title, optionClassName, className, disabled },
		onClick,
	} = props;
	const optionRef = useRef<HTMLLIElement>(null);

	const handleClick =
		(clickedValue: OptionType['value']): MouseEventHandler<HTMLLIElement> =>
		() => {
			if (disabled) return;
			onClick(clickedValue);
		};

	useEnterOptionSubmit({
		optionRef,
		value,
		onClick: disabled ? () => {} : onClick,
	});

	return (
		<li
			className={clsx(
				styles.option,
				styles[optionClassName || ''],
				disabled && styles.disabled
			)}
			value={value}
			onClick={handleClick(value)}
			tabIndex={disabled ? -1 : 0}
			data-testid={`select-option-${value}`}
			ref={optionRef}>
			<Text family={isFontFamilyClass(className) ? className : undefined}>
				{title}
				{disabled && <div className={styles.overlay}></div>}
			</Text>
		</li>
	);
};
