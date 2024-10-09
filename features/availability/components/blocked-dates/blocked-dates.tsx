import BlockedSlotsContainer from "./blocked-slots-container";
import BlockedSlotsList from "./blocked-slots-list";

const HEADING =
  "Block a slot in case you have another interviews (offline/phone) set up for that time and date.";

const BlockedDates = () => {
  return (
    <div>
      {/* block slot */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-brand-grey">
          {HEADING}
        </h3>
        <div>
          <BlockedSlotsList />
        </div>
      </div>
      <BlockedSlotsContainer />
    </div>
  );
};

export default BlockedDates;
