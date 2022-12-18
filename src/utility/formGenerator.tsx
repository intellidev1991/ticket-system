import { useAppContext } from "@/state";
import { Movie, Show, Theater, User } from "@/types";
import { DatePicker, Form, Input, InputNumber, Select } from "antd";
import { tools } from "./tools";

export const formItemGenerator = (sampleData: any) => {
  const store = useAppContext();
  return Object.keys(sampleData).map((key) => {
    let keyStandard = tools.camelCaseToWords(`${key}`).toLowerCase();
    let value = sampleData[key];
    let type = typeof value;

    if (keyStandard.includes("id")) return null;

    console.log(keyStandard, value, type);
    console.log("isShow", value instanceof Show);
    return (
      <Form.Item
        label={tools.camelCaseToWords(`${key}`)}
        name={key}
        rules={[
          {
            required: true,
            message: `Please input ${keyStandard}!`,
            type:
              type === "number"
                ? "integer"
                : value instanceof Date
                ? "date"
                : keyStandard.includes("email")
                ? "email"
                : "string",
          },
        ]}
      >
        {value instanceof Show ? (
          <Select>
            {store.shows.map((show: Show) => {
              return (
                <Select.Option
                  value={JSON.stringify(show)}
                >{`${show.theater.city}-${show.theater.country}-${show.theater.zipCode}`}</Select.Option>
              );
            })}
          </Select>
        ) : value instanceof Movie ? (
          <Select>
            {store.movies.map((movie: Movie) => {
              return (
                <Select.Option value={JSON.stringify(movie)}>
                  {movie.name}
                </Select.Option>
              );
            })}
          </Select>
        ) : value instanceof Theater ? (
          <Select>
            {store.theaters.map((theater: Theater) => {
              return (
                <Select.Option value={JSON.stringify(theater)}>
                  {theater.name}
                </Select.Option>
              );
            })}
          </Select>
        ) : value instanceof User ? (
          <Select>
            {store.users.map((user: User) => {
              return (
                <Select.Option value={JSON.stringify(user)}>
                  {user.email}
                </Select.Option>
              );
            })}
          </Select>
        ) : type === "number" ? (
          <InputNumber
            placeholder={`Enter number ${keyStandard}`}
            className="w-full"
          />
        ) : value instanceof Date ? (
          <DatePicker placeholder={`Enter ${keyStandard}`} className="w-full" />
        ) : keyStandard.includes("password") ? (
          <Input.Password placeholder={`Enter ${keyStandard}`} />
        ) : (
          <Input placeholder={`Enter ${keyStandard}`} />
        )}
      </Form.Item>
    );
  });
};
