import { useQuery } from "@tanstack/react-query";
import {
  getALlDistrictByProvince,
  getAllProvince,
  getAllWardByDistrict,
} from "../services/ShippingServices";

export const useGetProvince = () => {
  return useQuery({
    queryKey: ["PROVINCE"],
    queryFn: getAllProvince,
  });
};

export const useGetDistrict = (idProvince) => {
  return useQuery({
    queryKey: ["DISTRICT", idProvince],
    queryFn: () => getALlDistrictByProvince(idProvince),
    enabled: !!idProvince,
  });
};

export const useGetWard = (idDistrict, idProvince) => {
  return useQuery({
    queryKey: ["WARD", idDistrict],
    queryFn: () => getAllWardByDistrict(idDistrict),
    enabled: !!idDistrict,
  });
};
