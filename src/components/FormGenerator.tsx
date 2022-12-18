import { useAppContext } from "@/state";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Movie, Show, Theater, Ticket, User } from "@/types";
import { formItemGenerator } from "@/utility/formGenerator";
import { tools } from "@/utility/tools";
import { Button, Form, Modal, Table } from "antd";
import { useQRCode } from "next-qrcode";
import React, { useMemo, useRef } from "react";
import moment from "moment";

const { confirm } = Modal;

export enum FormTypeEnum {
  Movie = "Movie",
  User = "User",
  Show = "Show",
  Theater = "Theater",
  Ticket = "Ticket",
}

interface IFormGeneratorProps {
  type: FormTypeEnum;
  hasQRCode?: boolean;
}

const FormGenerator: React.FC<IFormGeneratorProps> = React.memo(
  ({ type, hasQRCode }) => {
    const store = useAppContext();
    const [form] = Form.useForm();

    const ref = useRef(tools.objectFactory(type));
    const { Canvas } = useQRCode();

    const onFinish = (values: any) => {
      values = tools.parseJson(values);
      switch (type) {
        case FormTypeEnum.Movie:
          store.setMovies([...store.movies, Movie.create(values)]);
          break;
        case FormTypeEnum.User:
          store.setUsers([...store.users, User.create(values)]);
          break;
        case FormTypeEnum.Theater:
          store.setTheaters([...store.theaters, Theater.create(values)]);
          break;
        case FormTypeEnum.Show:
          store.setShows([...store.shows, Show.create(values)]);
          break;
        case FormTypeEnum.Ticket:
          store.setTickets([...store.tickets, Ticket.create(values)]);
          break;
      }
      store.notify.success({
        message: "Item created",
        description: "Operation completed",
      });
      form.resetFields();
    };

    const onFinishFailed = (errorInfo: any) => {
      console.log("Failed:", errorInfo);
    };

    // Iterate over the Movie object and create a form item for each property
    const formItems = useMemo(() => {
      return () => {
        return formItemGenerator(ref.current.getSampleData());
      };
    }, []);

    const columns = useMemo(
      () => () => {
        //@ts-ignore
        const cols = Object.keys(ref.current.getSampleData()).map((key) => {
          //@ts-ignore
          let value = ref.current.getSampleData()[key];

          if (value instanceof Date) {
            return {
              title: tools.camelCaseToWords(`${key}`),
              dataIndex: `${key}`,
              key: `${key}`,
              render: (value: any) => moment(value).format("lll"),
            };
          } else if (value instanceof Object) {
            return {
              title: tools.camelCaseToWords(`${key}`),
              dataIndex: `${key}`,
              key: `${key}`,
              render: (value: any) => value.id,
            };
          } else if (key.toLowerCase().includes("password")) {
            return {
              title: tools.camelCaseToWords(`${key}`),
              dataIndex: `${key}`,
              key: `${key}`,
              render: (value: any) => (
                <span className="backdrop-blur-sm ">
                  {
                    // display parts of the password
                    value.slice(0, 1) +
                      "..." +
                      value.slice(value.length - 4, value.length)
                  }
                </span>
              ),
            };
          } else {
            return {
              title: tools.camelCaseToWords(`${key}`),
              dataIndex: `${key}`,
              key: `${key}`,
            };
          }
        });
        if (hasQRCode) {
          cols.push({
            title: "QR Code",
            dataIndex: "id",
            key: "id",
            render: (id: string) => {
              return (
                <div>
                  <Canvas
                    text={id}
                    options={{
                      level: "H",
                      margin: 1,
                      scale: 2,
                      width: 150,
                    }}
                  />
                </div>
              );
            },
          });
        }
        cols.push({
          title: "Action",
          key: "action",
          dataIndex: `id`,
          render: (id: string) => (
            <Button
              type="link"
              onClick={() => {
                confirm({
                  title: "Do you Want to delete these items?",
                  icon: <ExclamationCircleFilled />,
                  content: "Some descriptions",
                  onOk() {
                    switch (type) {
                      case FormTypeEnum.Movie:
                        store.setMovies(
                          store.movies.filter((x) => x.id !== id)
                        );
                        break;
                      case FormTypeEnum.User:
                        store.setUsers(store.users.filter((x) => x.id !== id));
                        break;
                      case FormTypeEnum.Theater:
                        store.setTheaters(
                          store.theaters.filter((x) => x.id !== id)
                        );
                        break;
                      case FormTypeEnum.Show:
                        store.setShows(store.shows.filter((x) => x.id !== id));
                        break;
                      case FormTypeEnum.Ticket:
                        store.setTickets(
                          store.tickets.filter((x) => x.id !== id)
                        );
                        break;
                    }
                    store.notify.success({
                      message: "Item deleted",
                      description: "Operation completed",
                    });
                  },
                });
              }}
            >
              Delete
            </Button>
          ),
        });
        return cols;
      },
      []
    );

    return (
      <div>
        <Form
          form={form}
          name="basic"
          initialValues={{ remember: false }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
          wrapperCol={{ span: 8 }}
        >
          {formItems()}

          <Form.Item wrapperCol={{ span: 8 }}>
            <Button type="primary" htmlType="submit" block>
              Submit
            </Button>
          </Form.Item>
        </Form>
        <Table
          //@ts-ignore
          dataSource={
            type === FormTypeEnum.Movie
              ? store.movies
              : type === FormTypeEnum.User
              ? store.users
              : type === FormTypeEnum.Theater
              ? store.theaters
              : type === FormTypeEnum.Show
              ? store.shows
              : type === FormTypeEnum.Ticket
              ? store.tickets
              : []
          }
          columns={columns()}
          scroll={{ x: 1024 }}
        />
      </div>
    );
  }
);

export { FormGenerator };
