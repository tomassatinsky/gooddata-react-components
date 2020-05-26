// (C) 2020 GoodData Corporation
module.exports = projectId => {
    return {
        execution: {
            afm: {
                measures: [
                    {
                        localIdentifier: "m4",
                        definition: {
                            measure: {
                                item: {
                                    uri: "/gdc/md/" + projectId + "/obj/9",
                                },
                            },
                        },
                    },
                ],
                attributes: [
                    {
                        displayForm: {
                            uri: "/gdc/md/" + projectId + "/obj/5.df",
                        },
                        localIdentifier: "a2",
                    },
                    {
                        displayForm: {
                            uri: "/gdc/md/" + projectId + "/obj/4.df",
                        },
                        localIdentifier: "a1",
                    },
                ],
            },
            resultSpec: {
                dimensions: [
                    {
                        itemIdentifiers: ["a2"],
                    },
                    {
                        itemIdentifiers: ["a1", "measureGroup"],
                    },
                ],
                sorts: [{ attributeSortItem: { attributeIdentifier: "a2", direction: "desc" } }],
            },
        },
    };
};
