### This repository contains code both for BE (Nest.js) and FE (Next.js). Please refer to each folder's README and follow the setup there.
#### For testing Nest.js GraphQL queries, you can use the following query.
For listing all postings:
```
{
    postings {
    id,
    title,
    location,
    applyButtonUrl
    }
}
```
For listing a single posting by ID:
```
{
    getPosting(id: 1) {
        id,
        title,
        location,
        description
        applyButtonUrl
    }
}
```