import { z } from 'zod';
import { mapKeys, camel, pascal } from 'radash';

const schema = z
  .object({
    name: z.string().transform(pascal),
    description: z.string(),
    stargazers_count: z.number(),
    topics: z.array(z.string()),
  })
  .transform(({ stargazers_count, ...data }) => ({
    ...data,
    stargazersCount: stargazers_count,
  }));

type Data = z.infer<typeof schema>;

export const getGithubRepoData = async () => {
  const response = await fetch(
    `https://api.github.com/repos/akshitkrnagpal/open-placeholder`
  );
  const data = await response.json();
  return schema.parse(data);
};
