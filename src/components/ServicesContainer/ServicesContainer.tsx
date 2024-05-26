import React, { FC, useEffect, useState } from "react";
import "./styles.scss";
import ServicesApiRequest from "../../api/Services/Services";
import Modal from "../Modal/Modal";

interface iServices {
  id: string;
  name: string;
  short_description: string;
}
interface iServicesOpen {
  id: string;
  name: string;
  text: string;
}

const ServicesContainer: FC = () => {
  const servicesApi = new ServicesApiRequest();

  const [data, setData] = useState<iServices[]>([]);
  const [dataOpen, setDataOpen] = useState<iServicesOpen>({
    id: "",
    name: "",
    text: "",
  });
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  useEffect(() => {
    servicesApi.list().then((resp) => {
      if (resp.success && resp.data) {
        setData(resp?.data?.results);
      }
    });
  }, []);

  const handleOpenServices = (id: string | number) => {
    servicesApi.getById({ urlParams: `${id}/` }).then((resp) => {
      if (resp.success && resp.data) {
        setDataOpen(resp.data as iServicesOpen);
        setIsOpenModal(true);
      }
    });
  };

  return (
    <>
      <Modal
        content={
          <div key={dataOpen.id} className="servicesModalContainer">
            <h1>{dataOpen.name}</h1>
            <p dangerouslySetInnerHTML={{ __html: dataOpen.text }}></p>
          </div>
        }
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
      />
      <div className="servicesContainer">
        <h2>услуги</h2>

        <div className="cardServices">
          {data.length > 0 &&
            data.map((item, index) => {
              return (
                <div className="servicesItem">
                  <h3>{`0${index + 1}`}</h3>

                  <div className="infoServicesItem">
                    <h4>{item.name}</h4>
                    <p>{item.short_description}</p>
                    <a onClick={() => handleOpenServices(item.id)}>
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

export default ServicesContainer;
