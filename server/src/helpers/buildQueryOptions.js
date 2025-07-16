function buildQueryOptions(query) {
  const {
    page = 1,
    limit = 10,
    sort = "-createdAt",
    fields,
    search,
    ...rest
  } = query;

  const filter = { ...rest };

  if (search) {
    filter.name = { $regex: search, $options: "i" };
  }

  Object.keys(filter).forEach((key) => {
    const value = filter[key];
    if (
      typeof value === "string" &&
      value.match(/(.+)\[(gte|gt|lte|lt|in)\]/)
    ) {
      const [, field, operator] = key.match(/(.+)\[(gte|gt|lte|lt|in)\]/);
      if (!filter[field]) filter[field] = {};
      filter[field][`$${operator}`] = value.includes(",")
        ? value.split(",")
        : value;
      delete filter[key];
    }
    if (typeof value === "string" && value.includes(",")) {
      filter[key] = { $in: value.split(",") };
    }
  });

  const options = {
    page: Number(page),
    limit: Number(limit),
    sort,
    select: fields ? fields.split(",").join(" ") : "-__v",
  };

  return { filter, options };
}

module.exports = buildQueryOptions;
