from sklearn.metrics import confusion_matrix, classification_report, accuracy_score
def evaluate_model(y_true, y_pred, target_names):
    acc = accuracy_score(y_true, y_pred)
    print(f'Accuracy: {acc*100:.2f}%')
    print(classification_report(y_true, y_pred, target_names=target_names))
    return confusion_matrix(y_true, y_pred)
