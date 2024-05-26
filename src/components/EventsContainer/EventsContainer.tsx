import React, { FC, useEffect, useState } from "react";
import EventsApiRequest from "../../api/Events/Events";
import {
  formatDateIntlDate,
  formatDateIntlTimeDate,
} from "../UI/functions/functions";
import "./styles.scss";
import icons from "../../assets/icons/icons";
import Modal from "../Modal/Modal";
import apiConfig from "../../api/apiConfig";

interface IEvents {
  id: string | number;
  event_type: string;
  category: string;
  start_datetime: string;
  end_datetime: string;
  title: string;
  address?: string;
  text?: string;
  images?: string[];
}

const EventsContainer: FC = () => {
  const eventsApi = new EventsApiRequest();
  const [data, setData] = useState<IEvents[]>([]);
  const [dataOpen, setDataOpen] = useState<IEvents>({
    id: "",
    event_type: "",
    category: "",
    start_datetime: "",
    end_datetime: "",
    title: "",
  });
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [next, setNext] = useState("");
  const [previous, setPrevious] = useState("");

  useEffect(() => {
    eventsApi.list().then((resp) => {
      if (resp.success && resp.data) {
        setData(resp.data.results);
        setNext(resp.data.next);
        setPrevious(resp.data.previous);
      }
    });
  }, []);

  const handleNext = () => {
    eventsApi.list({ urlParams: `?${next.split("?")[1]}` }).then((resp) => {
      if (resp.success && resp.data) {
        setData(resp.data.results);
        setNext(resp.data.next);
        setPrevious(resp.data.previous);
      }
    });
  };
  const handlePrevious = () => {
    eventsApi.list({ urlParams: `?${previous.split("?")[1]}` }).then((resp) => {
      if (resp.success && resp.data) {
        setData(resp.data.results);
        setNext(resp.data.next);
        setPrevious(resp.data.previous);
      }
    });
  };

  const handleOpenEvents = (id: string | number) => {
    eventsApi.getById({ urlParams: `${id}/` }).then((resp) => {
      if (resp.success && resp.data) {
        setDataOpen(resp.data as IEvents);
        setIsOpenModal(true);
      }
    });
  };
  return (
    <>
      <Modal
        content={
          <div key={dataOpen.id}>
            <div className="eventContainerInfo">
              <div className="eventModalTipeContainer">
                <h4>{dataOpen.event_type}</h4>
                <h5>{dataOpen.category}</h5>
              </div>

              {dataOpen.start_datetime && (
                <p className="eventDateTime">
                  {formatDateIntlTimeDate(dataOpen.start_datetime)}
                </p>
              )}
              {dataOpen.address && (
                <p className="eventAddress">{dataOpen.address}</p>
              )}
            </div>

            <div className="containerEventImage">
              {
                //@ts-ignore
                dataOpen?.images?.length > 0 &&
                  dataOpen.images?.map((item) => {
                    return (
                      //@ts-ignore
                      <img src={`${apiConfig.baseUrlMedia}${item.file}`}></img>
                    );
                  })
              }
            </div>
            <p dangerouslySetInnerHTML={{ __html: dataOpen.text || "" }}></p>
          </div>
        }
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
      />
      <div className="eventsContainer">
        <div className="containerLogoArrow">
          <div className="subTitleContainer">
            <img src={icons.Ellipse}></img>
            <h2 className="subTitle">Мероприятия</h2>
          </div>
          <div className="containerArrow">
            <div onClick={handleNext} className="arrowImage">
              <img src={icons.arrowRightOrange}></img>
            </div>
            <div onClick={handlePrevious} className="arrowImage">
              <img src={icons.arrowLeft}></img>
            </div>
          </div>
        </div>

        <div className="containerEvents">
          {data.length > 0 &&
            data.map((item) => {
              return (
                <div className="eventsItem">
                  <div className="eventItemTitleContainer">
                    <div className="eventItemTitle">
                      <h3>{item.event_type}</h3>
                      {item.category && <h4>{item.category}</h4>}
                    </div>
                    {item.end_datetime ? (
                      <p className="eventItemDate">{`${formatDateIntlDate(
                        item.start_datetime
                      )} - ${formatDateIntlDate(item.end_datetime)}`}</p>
                    ) : (
                      <p className="eventItemDate">{`${formatDateIntlDate(
                        item.start_datetime
                      )}`}</p>
                    )}
                  </div>
                  <div className="eventItemFooter">
                    <p>{item.title}</p>
                    <a onClick={() => handleOpenEvents(item.id)}>
                      Подробнее...
                    </a>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default EventsContainer;
