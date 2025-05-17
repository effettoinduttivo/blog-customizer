import { useRef, useState } from 'react';
import clsx from 'clsx';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

import styles from './ArticleParamsForm.module.scss';

type FormProps = {
	setArticleState: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ setArticleState }: FormProps) => {
	const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);

	const sidebarRef = useRef<HTMLDivElement | null>(null);

	useOutsideClickClose({
		isOpen: isSidebarOpen,
		onChange: setSidebarOpen,
		rootRef: sidebarRef,
	});

	const handleOptionChange = <K extends keyof ArticleStateType>(
		field: K,
		value: ArticleStateType[K]
	) => {
		setFormState((prevState) => ({
			...prevState,
			[field]: value,
		}));
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setArticleState(formState);
		setSidebarOpen(false);
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		setArticleState(defaultArticleState);
		setSidebarOpen(false);
	};

	const setDisableFontColor = fontColors.map((option) => ({
		...option,
		disabled: option.value === formState.backgroundColor.value,
	}));

	const setDisableBackgroundColor = backgroundColors.map((option) => ({
		...option,
		disabled: option.value === formState.fontColor.value,
	}));

	return (
		<>
			<ArrowButton
				isOpen={isSidebarOpen}
				onClick={() => {
					setSidebarOpen((prev) => !prev);
				}}
			/>
			<aside
				ref={sidebarRef}
				className={clsx(styles.container, {
					[styles.container_open]: isSidebarOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(value) => {
							handleOptionChange('fontFamilyOption', value);
						}}
						title='Шрифт'
					/>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={(value) => {
							handleOptionChange('fontSizeOption', value);
						}}
						title='Размер шрифта'
					/>
					<Select
						selected={formState.fontColor}
						options={setDisableFontColor}
						onChange={(value) => {
							handleOptionChange('fontColor', value);
						}}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={formState.backgroundColor}
						options={setDisableBackgroundColor}
						onChange={(value) => {
							handleOptionChange('backgroundColor', value);
						}}
						title='Цвет фона'
					/>
					<Select
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={(value) => {
							handleOptionChange('contentWidth', value);
						}}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
