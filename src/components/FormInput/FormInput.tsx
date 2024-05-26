import React, { useEffect, useState } from "react";
import "./style.scss";
import icons from "../../assets/icons/icons";
import EmojiPicker from "emoji-picker-react";
import FormSelector from "../FormSelector/FormSelector";
import InputMask from "react-input-mask";
import ToggleButton from "../ToggleButton/ToggleButton";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Checkbox from "../Checkbox/Checkbox";
import DateInput from "../UI/datePicker/index";
import {
  formatDateReverse,
  getFormatedDate,
  getHtmlFormatDate,
  transformDate,
} from "../UI/functions/functions";
import Buttons from "../Buttons/Buttons";

type FormInputProps = {
  id?: string;
  type?: string;
  textArea?: boolean;
  placeholder?: string;
  style: string;
  value: string | undefined;
  onChange: (value: string, isChecked?: boolean) => void;
  onKeyDown?: (value: any, isChecked?: boolean) => void;
  subInput: string | undefined;
  required: boolean;
  error: string | boolean;
  description?: string | undefined;
  disabled?: boolean;
  ico?: string | undefined;
  question?: boolean;
  options?: string[] | undefined;
  mask?: string | undefined;
  keyData: string;
  checked?: boolean | undefined;
  loading?: boolean;
  friedlyInput?: boolean;
  isFormSubmitted?: boolean;
  helpText?: string;
  emoji?: boolean;
};

const FormInput: React.FC<FormInputProps> = ({
  id,
  type,
  textArea,
  placeholder,
  style,
  value,
  onChange,
  onKeyDown,
  subInput,
  required,
  error,
  description,
  disabled,
  ico,
  question,
  options,
  mask,
  keyData,
  checked,
  loading,
  friedlyInput,
  helpText,
  isFormSubmitted,
  emoji,
}) => {
  const [isLoading, setIsLoading] = useState(loading);
  const [valueSet, setValueSet] = useState(
    value === undefined && !isLoading ? "" : value || ""
  );

  const [isActive, setIsActive] = useState(false);
  const [isCopy, setIsCopy] = useState(false);
  const [isErr, setIsErr] = useState(error);
  const [date, setDate] = useState(value ? transformDate(value) : "");

  useEffect(() => {
    setIsLoading(loading);

    if (!isLoading) {
      setValueSet(value === undefined ? "" : value);
    }
  }, [loading, isLoading, value]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newValue = event.target.value;

    if (newValue === "") {
      setIsErr(true);
    } else {
      setIsErr(false);
    }

    setValueSet(newValue);
    onChange(newValue);
  };

  const handleEmojiSelect = (emoji: { emoji: string }) => {
    setValueSet((prevValue) => prevValue + emoji.emoji);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(valueSet);
    setIsCopy(true);
    setTimeout(() => {
      setIsCopy(false);
    }, 3000);
  };

  const handleEmailMask = (event: React.ChangeEvent<HTMLInputElement>) => {
    const email = event.target.value;
    const maskedEmail = email
      .replace(/[^A-Za-z0-9@._-]/g, "")
      .replace(/^(.{0,2})@/, "$1@")
      .replace(/@([^.]+)$/, "@$1")
      .replace(/([._-])\1+/g, "$1");

    if (email === "") {
      setIsErr(true);
    } else {
      setIsErr(false);
    }

    setValueSet(maskedEmail);
    onChange(maskedEmail);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phoneNumber = e.target.value.replace(/\D/g, "");

    setValueSet(phoneNumber.slice(1));
    onChange(phoneNumber.slice(1));
  };

  const handleLink = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    if (
      inputValue.startsWith("https://") ||
      inputValue.startsWith("http://") ||
      inputValue.startsWith("www.")
    ) {
      setValueSet(inputValue);
      onChange(inputValue);
    } else {
      const correctedValue = `https://${inputValue}`;
      setValueSet(correctedValue);
      onChange(correctedValue);
    }
  };

  const handleToggle = (formDataKey: string, isChecked: boolean) => {
    //@ts-ignore
    setValueSet(isChecked);
    onChange("", isChecked);
  };

  const [dateValue, setDateValue] = useState<string>("");

  const handleChangeDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDateValue(event.target.value);
    onChange(event.target.value);
  };

  const [skeletonHeight, setSkeletonHeight] = useState("100%");
  const [skeletonWidth, setSkeletonWidth] = useState("100%");

  useEffect(() => {
    const inputContainer = document.querySelector(".formTextArea, .formInput");

    if (inputContainer) {
      const inputContainerRect = inputContainer.getBoundingClientRect();
      setSkeletonHeight(`${inputContainerRect.height + 10}px`);
      setSkeletonWidth(`${inputContainerRect.width}px`);
    }
  }, []);

  return (
    <>
      {isLoading ? (
        <Skeleton
          height={skeletonHeight}
          width={skeletonWidth}
          count={1}
          borderRadius={8}
        />
      ) : (
        <div className={style}>
          {subInput || textArea ? (
            <div className="formHeader">
              {type !== "boolean" && (
                <label
                  htmlFor={id}
                  className={`subTitileFormInput ${required ? "required" : ""}`}
                >
                  {subInput}
                  <span className="requiredStar">{required && "*"}</span>
                </label>
              )}
              {textArea && valueSet?.length > 0 && (
                <div
                  className={`copyContainer ${isCopy ? "" : "active"}`}
                  onClick={handleCopy}
                >
                  <img src={icons.fileCopy} />
                  <p>{isCopy ? "Скопировано" : "Скопировать"}</p>
                </div>
              )}
            </div>
          ) : null}
          <div className="inputContainer">
            <div className="flexInput">
              <div className="leftIconInpit">
                {ico && <img src={ico} alt="Icon" />}
              </div>
              {!textArea ? (
                options === undefined || options.length === 0 ? (
                  (() => {
                    switch (type) {
                      case "phone":
                        return (
                          <InputMask
                            mask={mask ? mask : "+7 (999) 999-99-99"}
                            maskChar="_"
                            placeholder="+7"
                            className={`formInput ${isErr ? "error" : ""} ${
                              ico ? "paddingIco" : ""
                            } ${friedlyInput && "friendly"}`}
                            value={valueSet}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => handlePhoneChange(e)}
                            pattern={mask}
                          />
                        );
                      case "email":
                        return (
                          <InputMask
                            mask={mask || ""}
                            maskChar="_"
                            placeholder="example@example.com"
                            className={`formInput ${isErr ? "error" : ""} ${
                              ico ? "paddingIco" : ""
                            } ${friedlyInput && "friendly"}`}
                            value={valueSet}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => handleEmailMask(e)}
                          />
                        );
                      case "url":
                        return (
                          <InputMask
                            mask={mask || ""}
                            maskChar=""
                            placeholder="https://example.com"
                            className={`formInput ${isErr ? "error" : ""} ${
                              ico ? "paddingIco" : ""
                            } ${friedlyInput && "friendly"}`}
                            value={value}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => handleLink(e)}
                          />
                        );
                      case "boolean":
                        return (
                          <ToggleButton
                            text={subInput}
                            styleContainer={`containerToggle`}
                            classesText={"textToggle"}
                            formDataKey={keyData}
                            onToggle={handleToggle}
                            checked={checked}
                          />
                          // <Checkbox
                          //   id={keyData}
                          //   label={subInput}
                          //   checked={checked}
                          //   onChange={(e)=>handleChange(e)}
                          // />
                        );
                      case "radio":
                        return (
                          <input
                            id={id}
                            type={type}
                            placeholder={placeholder}
                            value={valueSet}
                            //@ts-ignore
                            onChange={(e) => handleToggle(id, e.target.checked)}
                            disabled={disabled || false}
                          />
                        );
                      case "date":
                        return (
                          <input
                            type="date"
                            value={dateValue ? dateValue : value}
                            onChange={handleChangeDate}
                            max="9999-12-31" // ограничение по максимальной дате (можно установить наибольшую допустимую дату)
                            className={`formInput ${isErr ? "error" : ""} ${
                              ico ? "paddingIco" : ""
                            } ${friedlyInput && "friendly"}`}
                          />
                        );

                      // case "dateButton":
                      //   return (
                      //     <DateInput
                      //       closeOnSelect={true}
                      //       date={date}
                      //       format="DDMMYYYY"
                      //       separator="-"
                      //       placeholder={placeholder || "дд-мм-гггг"}
                      //       onChange={(e: any) => handleChangeData(e)}
                      //       className={`formInput ${isErr ? "error" : ""} ${
                      //         ico ? "paddingIco" : ""
                      //       } ${friedlyInput && "friendly"}`}
                      //       disabled={disabled || false}
                      //     />
                      //   );
                      case "counter":
                        return (
                          <div className="counterContainer">
                            {/* <Buttons
                                ico={icons.minus}
                                text={""}
                                className="buttonCount"
                                onClick={handleMinusClick}
                              ></Buttons>
                              <b className="countText">{count}</b>
                              <Buttons
                                ico={icons.plus}
                                text={""}
                                className="buttonCount"
                                onClick={handlePlusClick}
                              ></Buttons> */}
                          </div>
                        );

                      default:
                        return mask ? (
                          <InputMask
                            id={id}
                            mask={mask || ""}
                            type={type}
                            maskChar=""
                            placeholder={placeholder || ""}
                            className={`formInput ${isErr ? "error" : ""} ${
                              ico ? "paddingIco" : ""
                            } ${friedlyInput && "friendly"}`}
                            value={valueSet}
                            onChange={handleChange}
                            disabled={disabled || false}
                          />
                        ) : (
                          <input
                            id={id}
                            type={type}
                            placeholder={placeholder}
                            className={`formInput ${isErr ? "error" : ""} ${
                              ico ? "paddingIco" : ""
                            } ${friedlyInput && "friendly"}`}
                            value={valueSet}
                            onChange={handleChange}
                            disabled={disabled || false}
                            onKeyDown={onKeyDown}
                          />
                        );
                    }
                  })()
                ) : (
                  <FormSelector
                    value={valueSet}
                    //@ts-ignore
                    options={options}
                    //@ts-ignore
                    disabled={disabled}
                    onChange={(e) => onChange(e)}
                    //@ts-ignore
                    error={isErr}
                    ico={ico}
                    friendlyInput={friedlyInput}
                    placeholder={placeholder}
                  />
                )
              ) : (
                <>
                  <textarea
                    onBlur={handleChange}
                    className={`formTextArea ${friedlyInput && "friendly"}`}
                    value={valueSet}
                    onChange={handleChange}
                    onClick={() => setIsActive(false)}
                  />
                  {emoji && (
                    <div className="characterCount">
                      <div className="emoji__container">
                        <div className="emoji">
                          <img
                            src={icons.Smileys}
                            onClick={() => setIsActive(!isActive)}
                            alt="Emoji"
                          />
                          {isActive && (
                            <EmojiPicker
                              onEmojiClick={handleEmojiSelect}
                              searchDisabled
                            />
                          )}
                        </div>
                      </div>
                      <div className="question__container">
                        {valueSet.length}
                      </div>
                    </div>
                  )}
                </>
              )}
              {question && (
                <div className="rightIconInpit">
                  <img
                    src={isErr ? icons.AlertCircle : icons.HelpCircle}
                    alt="Icon"
                  />
                </div>
              )}
            </div>
            {isErr && <p>{description}</p>}
            {helpText && <p className="helpText">{helpText}</p>}
          </div>
        </div>
      )}
    </>
  );
};

export default FormInput;
