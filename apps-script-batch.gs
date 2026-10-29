// Batch sync for the Apps Script behind the app. Two small edits in your existing script; the web-app URL stays the same.
//
// 1) In doPost, replace the two lines that handle 'upsert' and 'delete' with these:
//
//      let applied;
//      if (req.action === 'batch') applied = applyBatch(sh, req.ops);
//      else if (req.action === 'upsert') upsert(sh, req.task);
//      else if (req.action === 'delete') remove(sh, req.id);
//
//    and make the reply include the count:   return out({ ok: true, applied: applied, tasks: list(sh) });
//
// 2) Add this function anywhere in the script:

function applyBatch(sh, ops) {
  if (!Array.isArray(ops)) return 0;
  ops.forEach(o => {
    if (o.action === 'upsert') upsert(sh, o.task);
    else if (o.action === 'delete') remove(sh, o.id);
  });
  return ops.length; // the app only treats the batch as saved when this equals the number it sent
}

// Then: Deploy > Manage deployments > pencil > Version: New version > Deploy.
