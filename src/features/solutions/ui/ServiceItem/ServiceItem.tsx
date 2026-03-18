"use client";

import { useCartStore } from "@/features/cart/store/cart";
import { useFormsPopupStore } from "@/features/forms";

import { ArrowRightIcon } from "@/shared/ui/icons";

import type { Service } from "../../model/types";
import styles from "./ServiceItem.module.scss";

interface ServiceItemProps {
  service: Service;
}

export const ServiceItem = ({ service }: ServiceItemProps) => {
  const formattedPrice = `€${service.price.toLocaleString("en-IE")}`;
  const addToCart = useCartStore((state) => state.addToCart);
  const openRequest = useFormsPopupStore((state) => state.openRequest);


  const onClick = () => {
    if (service.type === "purchasable") {
      addToCart({
        id: service.id,
        title: service.title,
        price: service.price,
        quantity: 1,
      });
    } else {
      openRequest(service.title);
    }
  };

  return (
    <button className={styles.service_item} onClick={onClick}>
      <span className={styles.service_item__title}>{service.title}:</span>
      <span className={styles.service_item__price}>
        {service.prefix && (
          <span className={styles.service_item__from}>{service.prefix} </span>
        )}{" "}
        <strong>{formattedPrice}</strong>{" "}
        {service.suffix && (
          <span className={styles.service_item__from}>{service.suffix}</span>
        )}
      </span>
      <ArrowRightIcon />
    </button>
  );
};
