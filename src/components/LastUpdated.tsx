const LastUpdated = () => {
    const lastUpdatedDate = import.meta.env.VITE_ML_COMMIT_DATE;

    return (
        <span className="subtitle" style={{ marginBottom: 0, marginTop: 0 }}>
            Last updated: {new Date(lastUpdatedDate).toLocaleDateString()}
        </span>
    );
};

export default LastUpdated;
