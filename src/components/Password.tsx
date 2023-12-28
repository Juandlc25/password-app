import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import {
  hasNoConsecutiveLetters,
  hasNumber,
  hasSpecialChar,
  hasUppercase,
} from "../utils";

type PasswordReqs =
  | "hasNumber"
  | "hasNoConsecutiveLetters"
  | "hasSpecialCharacters"
  | "hasUppercaseLetter";

interface Req {
  type: PasswordReqs;
  validation: boolean;
  text: string;
}

interface Props {
  passwordReqs: PasswordReqs[];
}

const Password = ({ passwordReqs }: Props) => {
  const [value, setValue] = useState<string>("");
  const initialReqs: Req[] = [
    { type: "hasNumber", validation: false, text: "Has a number 0-9" },
    {
      type: "hasUppercaseLetter",
      validation: false,
      text: "Has uppercase Letter",
    },
    {
      type: "hasSpecialCharacters",
      validation: false,
      text: "Has a special char !@#$%^&*",
    },
    {
      type: "hasNoConsecutiveLetters",
      validation: false,
      text: "Has no consecutive letters",
    },
  ];
  const [reqs, setReqs] = useState<Req[]>(initialReqs);

  useEffect(() => {
    if (value.length) {
      setReqs(
        reqs.map((req) => {
          if (req.type === "hasNumber") {
            return { ...req, validation: hasNumber(value) };
          } else if (req.type === "hasUppercaseLetter") {
            return { ...req, validation: hasUppercase(value) };
          } else if (req.type === "hasSpecialCharacters") {
            return { ...req, validation: hasSpecialChar(value) };
          } else if (req.type === "hasNoConsecutiveLetters") {
            return { ...req, validation: hasNoConsecutiveLetters(value) };
          }
          return req;
        })
      );
    } else {
      setReqs(
        initialReqs
          .filter((req) => passwordReqs.includes(req.type))
          .map((req) => {
            return { ...req, validation: false };
          })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, passwordReqs.length]);

  return (
    <div className="flex items-center justify-center flex-col gap-6">
      <span className="text-3xl font-bold">Password Component</span>
      <div className="flex items-center gap-10">
        <input
          data-testid="password"
          value={value}
          onChange={(e) => setValue(e?.target?.value)}
          autoFocus
          type="text"
          className="outline-blue-400 px-1 border-black border"
        />
        <div className="flex flex-col gap-2">
          {reqs?.map(({ validation, text }, key) => (
            <div key={key} className="flex gap-2 items-center">
              {validation ? (
                <FaCheckCircle className="text-green-600" size={26} />
              ) : (
                <IoIosCloseCircle className="text-red-600" size={26} />
              )}
              <span className="text-sm font-medium">{text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Password;
