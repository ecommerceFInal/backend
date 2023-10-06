import { Address, User } from "../entities";
import { AppError } from "../errors";
import { UserCreate, UserReturn, UserUpdate } from "../interfaces";
import addressRepository from "../repositories/address.repository";
import userRepository from "../repositories/user.repository";
import { userReturnSchema } from "../schemas";

const create = async (data: UserCreate): Promise<UserReturn> => {
  const { address, ...rest } = data;
  const { zip_code, state, city, street_name, street_number, comp_address } =
    address;
  const foundAddress = await addressRepository.findOneBy({
    ...address,
    zip_code: zip_code ? zip_code : "",
  });
  if (foundAddress) {
    throw new AppError("Address already exists", 409);
  }
  const createAddress: Address = addressRepository.create({ ...address });
  await addressRepository.save(createAddress);

  const user: User = userRepository.create({
    ...rest,
    address: createAddress,
  });
  await userRepository.save(user);
  return user;
};

const update = async (user: User, data: UserUpdate): Promise<UserReturn> => {
  const userUpdate: User = await userRepository.create({ ...user, ...data });
  await userRepository.save(userUpdate);
  return userReturnSchema.parse(userUpdate);
};

const destroy = async (user: User): Promise<void> => {
  await userRepository.remove(user);
};

export default { create, update, destroy };
