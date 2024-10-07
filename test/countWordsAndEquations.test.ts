import { expect, test } from "vitest";

import { countWordsAndEquations } from "../src/utils/utils";

const markdown = `
### Objective

The objective of a ML problem is to find the _optimal_ model parameters $\\theta$ that maximize some performance. To define what is _optimal_, we use a _loss function_ (also known as a _cost function_ or _objective function_). A loss function is a mathematical function that measures how well the model's output aligns with the desired outcomes or patterns in the data. **Therefore, the objective of a machine learning problem is to minimize the loss function.**

We can define the general form of a loss function as:

$$
\\begin{equation} \\label{eq:loss}
L = \\mathcal{L}(f(\\mathbf{x}; \\theta), \\mathbf{y}),
\\end{equation}
$$

where:

- $f(\\mathbf{x}; \\theta)$ is the model's output, given input $\\mathbf{x}$ and parameters $\\theta$,
- $\\mathbf{y}$ is the true target value (optional: only used for supervised learning),
- $L$ is the loss value.

<blockquote class="note">

Typically, $L$ is a _scalar value_ representing the overall loss. In some cases, such as with multiple samples or structured outputs (e.g., images), the loss may initially be computed as a set of individual scalar losses (e.g., per sample or per pixel), which are then aggregated (e.g., summed or averaged) to yield a single scalar value.

</blockquote>

### Optimization

**Optimization refers to the process of _minimizing_ the loss function $\\mathcal{L}$ in order to _optimize_ the model's performance by adjusting the model parameters $\\theta$.**  In other words, we aim to find the optimal model parameters that will minimize the loss function and improve the model's performance.

Formally, the optimization problem can be written as:

<blockquote class="equation">

**Gradient Descent Update Rule**:

$$
\begin{equation} \\label{eq:gd}
\\mathbf{\theta}^{(t+1)} = \\mathbf{\theta}^{(t)} - \\alpha \nabla_{\\mathbf{\theta}} \\mathcal{L}(\\mathbf{\theta}),
\\end{equation}
$$

$$
\\begin{aligned}
\\lim_{\\lambda \\to 0} \\frac{f(y  + \\lambda (x - y)) - f(y)}{\\lambda} &\\leq f(x) - f(y) \\\\
\\langle \\nabla f(y), x - y \\rangle &\\leq f(x) - f(y).
\\end{aligned}
$$

</blockquote>

where:

- $\\mathbf{\\theta}^{(t)}$ is the parameter vector at iteration $t$,
- $\\alpha$ is the scalar **learning rate** that controls the step size of the update,
- $\\nabla_{\\mathbf{\\theta}} \\mathcal{L}(\\mathbf{\\theta})$ is the **gradient** of the loss function with respect to the parameter vector $\\mathbf{\\theta}$.

Now, we can implement the GD algorithm to find the optimal value of $\theta$ that minimizes the loss function:

\`\`\`execute-python
import numpy as np

# Loss function
def loss(theta):
    return (theta - 5) ** 2

# Gradient of the loss function
def gradient(theta):
    return 2 * (theta - 5)

# Gradient Descent
theta = 0  # Initial parameter value
alpha = 0.1  # Learning rate
n_iterations = 100  # Number of iterations

for i in range(n_iterations):
    theta = theta - alpha * gradient(theta)

# Final parameter value
print("Optimal theta:", theta)
\`\`\`

As we can see, GD converges to the optimal value of $\\theta = 5$ that minimizes the loss function. This simple example demonstrates the basic principle of gradient descent.

<blockquote class="note">

So why not just use calculus to find the optimal value? The answer is that in many real-world ML problems, the loss function is not as simple as the one we just saw. It may be a complex function with many parameters, and the optimal solution may not have a closed-form solution. Therefore, we use iterative optimization algorithms like GD to find the optimal parameters.

</blockquote>
`;

test("countWordsAndEquations", async () => {
    const result = countWordsAndEquations(markdown);
    expect(result).toEqual({
        wordCount: 400,
        equationCount: 4,
        codeLineCount: 22,
    });
});
