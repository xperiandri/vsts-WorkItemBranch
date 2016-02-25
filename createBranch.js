var createBranchButton = (function () {
    "use strict";

    return {
        execute: function (sourceItemContext) {
            var ref = sourceItemContext.ref ? sourceItemContext.ref : null;
            // Publish event to Application Insights
            if (window.appInsights) {
                window.appInsights.trackEvent("WorkitemBranchCreate");
            }

            // Post the ref update
            VSS.ready(function () {
                require(["TFS/VersionControl/GitRestClient"], function (TfsGitClient) {
                    var gitClient = TfsGitClient.getClient();
                    gitClient.updateRefs([{
                        name: ref.name,
                        oldObjectId: ref.objectId,
                        newObjectId: "0000000000000000000000000000000000000000"
                    }], sourceItemContext.repository.id).then(function () {
                        sourceItemContext.view.refresh();
                    });
                });
            });
        }
    };
}());

VSS.register("createBranchButton", createBranchButton);