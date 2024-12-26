import { Service, ServiceModel, IService } from "../models/Service";

export class ServiceRepository {
  private documentToService(doc: IService): Service {
    const { _id, ...rest } = doc.toObject();
    return {
      id: _id.toString(),
      ...rest,
    };
  }

  async create(service: Partial<Service>): Promise<Service> {
    const newService = new ServiceModel(service);
    const saved = await newService.save();
    return this.documentToService(saved);
  }

  async findById(id: string): Promise<Service | null> {
    const service = await ServiceModel.findById(id);
    return service ? this.documentToService(service) : null;
  }

  async findByUserId(userId: string): Promise<Service[]> {
    const services = await ServiceModel.find({ userId });
    return services.map((service) => this.documentToService(service));
  }

  async update(id: string, update: Partial<Service>): Promise<Service | null> {
    const updated = await ServiceModel.findByIdAndUpdate(
      id,
      { $set: update },
      { new: true }
    );
    return updated ? this.documentToService(updated) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await ServiceModel.findByIdAndDelete(id);
    return result !== null;
  }

  /**
   * Checks if all provided service IDs exist and belong to the specified user
   * @returns Array of non-existent or unauthorized service IDs
   */
  async validateUserServices(
    serviceIds: string[],
    userId: string
  ): Promise<string[]> {
    const services = await ServiceModel.find({
      _id: { $in: serviceIds },
      userId: userId,
    });

    const foundIds = services.map((service) =>
      (service._id as string)?.toString()
    );
    return serviceIds.filter((id) => !foundIds.includes(id));
  }

  /**
   * Checks if all provided service IDs exist in the system
   * @returns Array of non-existent service IDs
   */
  async validateServices(serviceIds: string[]): Promise<string[]> {
    const services = await ServiceModel.find({
      _id: { $in: serviceIds },
    });

    const foundIds = services.map((service) =>
      (service._id as string)?.toString()
    );
    return serviceIds.filter((id) => !foundIds.includes(id));
  }
}
