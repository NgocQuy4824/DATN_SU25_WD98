function buildQueryOptions(query) {
  const {
    page = 1,
    limit = 10,
    sort = "-createdAt",
    fields,
    search,
    searchField,
    ...rest
  } = query;

  const filter = {};

  if (search && searchField) {
    const fields = searchField.split(",");
    filter.$or = fields.map((field) => ({
      [field]: { $regex: search, $options: "i" },
    }));
  }
  console.log(filter.name);
  Object.entries(rest).forEach(([key, value]) => {
    const match = key.match(/(.+)\[(gte|gt|lte|lt|in)\]/);
    if (match) {
      const [, field, operator] = match;
      if (!filter[field]) filter[field] = {};
      filter[field][`$${operator}`] = value.includes(",")
        ? value.split(",")
        : value;
    } else if (typeof value === "string" && value.includes(",")) {
      filter[key] = { $in: value.split(",") };
    } else {
      filter[key] = value;
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
