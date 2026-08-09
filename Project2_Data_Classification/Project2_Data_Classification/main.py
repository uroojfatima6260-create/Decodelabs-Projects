from src.data_loader import get_prepared_data
from src.model import KNNClassifierModel
from src.evaluation import evaluate_model

def main():
    data = get_prepared_data()
    knn = KNNClassifierModel(n_neighbors=5)
    knn.train(data['X_train'], data['y_train'])
    preds = knn.predict(data['X_test'])
    evaluate_model(data['y_test'], preds, data['target_names'])

if __name__ == '__main__':
    main()
